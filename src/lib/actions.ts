"use server";
import { google } from "googleapis";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import fetch from "node-fetch";

// require("dotenv").config()

export type SheetForm = {
  name: string;
  email: string;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  auth: {
    // type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.OTHER_MAIL_PASSWORD,
    // clientId: process.env.OUTH_CLIENT_ID,
    // clientSecret: process.env.OUTH_CLIENT_SECRET,
    // refreshToken: process.env.OUTH_REFRESH_TOKEN,
  },
} as SMTPTransport.Options);

// const mailOptions = {
//   from: process.env.SMTP_USER,
//   to: process.env.SMTP_USER,
//   subject: "New Ticket or User",
//   text: ``
// }

export async function sendTicketEmail(form: FormData) {
  const rawFormdata = {
    name: form.get("name"),
    email: form.get("email"),
    message: form.get("message"),
  };

  const info = await transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to: process.env.MAIL_USERNAME,
    subject: "New Ticket or User from Elorm Portfolio",
    text: `Name: ${rawFormdata.name}\nEmail: ${rawFormdata.email}\nMessage: ${rawFormdata.message}`,
  });

  const body = rawFormdata as SheetForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.name, body.email]],
      },
    });

    // console.log(res.status)
  } catch (e) {
    console.error(e);
  }

  // console.log(info)

  // console.log(rawFormdata)

  // redirect("/")
  // alert("Your message has been sent")
}

export async function sendEmailListData(form: FormData) {
  const rawFormdata = {
    name: form.get("name"),
    email: form.get("email"),
  };

  const body = rawFormdata as SheetForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.name, body.email]],
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: process.env.MAIL_USERNAME,
      subject: "New Ticket or User from Elorm Portfolio",
      text: `Name: ${rawFormdata.name}\nEmail: ${rawFormdata.email}`,
    });

    console.log(res.status);
  } catch (e) {
    console.error(e);
  }

  // console.log(rawFormdata)
  // redirect("/")
}

// const ITEMS_PER_PAGE = 6

export async function getAllPostsdata() {
  // const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const res = await fetch(
    "https://public-api.wordpress.com/rest/v1.1/sites/marriondokosi.wordpress.com/posts/?prettry=true&fields=ID,author,date,title,content,excerpt,slug,featured_image,tags"
  );
  const data = await res.json();
  // const totalPosts = data.found
  // const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE)
  // const posts = data.posts.slice(offset, offset + ITEMS_PER_PAGE)
  // const currentPage = offset / ITEMS_PER_PAGE + 1
  // return { posts, totalPages }
  return data;
}

export async function getSinglePostData(slug: string) {
  const request_link = `https://public-api.wordpress.com/rest/v1.1/sites/marriondokosi.wordpress.com/posts/slug:${slug}?prettry=true&fields=ID,author,date,title,content,excerpt,slug,post_thumbnail,tags`;
  const res = await fetch(request_link);
  const data = await res.json();
  return data;
}
