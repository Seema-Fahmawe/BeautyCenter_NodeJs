
import { asyncHandler } from './../../../service/errorHandling.js';
import cloudinary from './../../../service/cloudinary.js';
import userModel from '../../../../DB/model/User.model.js';
import { generateToken } from '../../../service/generateAndVerifyToken.js';
import sendEmail from '../../../service/sendEmail.js';
import { compare, hash } from '../../../service/hashAndCompare.js';

export const profilePic = asyncHandler(async (req, res, next) => {

  let user = await userModel.findById(req.user._id);
  if (user.image?.public_id) {
    await cloudinary.uploader.destroy(user.image.public_id);
  }
  const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/userPic` });
  user = await userModel.updateOne({ image: { public_id, secure_url } });
  if (user.modifiedCount) {
    return res.status(201).json({ message: 'success', user });
  }
  return next(new Error('Error uploading file', { cause: 400 }));
})

export const addSupervisorAdmin = asyncHandler(async (req, res, next) => {
  let { userName, email, password, cPassword, phone } = req.body;
  if (await userModel.findOne({ email })) {
    return next(new Error('account already exists', { cause: 409 }));
  }
  password = hash(password);
  const token = generateToken({ email }, process.env.SIGNATURE_SIGNUP, 60 * 5);
  const refresh_token = generateToken({ email }, process.env.SIGNATURE_SIGNUP, 60 * 60 * 24);
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  const Rlink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refresh_token}`;
  const html = `<!DOCTYPE html>
      <html>
      <head>
      
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
        /**
         * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
         */
        @media screen {
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
          }
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 700;
            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
          }
        }
        /**
         * Avoid browser level font resizing.
         * 1. Windows Mobile
         * 2. iOS / OSX
         */
        body,
        table,
        td,
        a {
          -ms-text-size-adjust: 100%; /* 1 */
          -webkit-text-size-adjust: 100%; /* 2 */
        }
        /**
         * Remove extra space added to tables and cells in Outlook.
         */
        table,
        td {
          mso-table-rspace: 0pt;
          mso-table-lspace: 0pt;
        }
        /**
         * Better fluid images in Internet Explorer.
         */
        img {
          -ms-interpolation-mode: bicubic;
        }
        /**
         * Remove blue links for iOS devices.
         */
        a[x-apple-data-detectors] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-decoration: none !important;
        }
        /**
         * Fix centering issues in Android 4.4.
         */
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
        body {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        /**
         * Collapse table borders to avoid space between cells.
         */
        table {
          border-collapse: collapse !important;
        }import sendEmail from './../../../service/sendEmail';
import { sendCode } from './../../auth/controller/auth.controller';
import { hash } from './../../../service/hashAndCompare';
import ownerModel from './../../../../DB/model/Owner.model';

        a {
          color: #1a82e2;
        }
        img {
          height: auto;
          line-height: 100%;
          text-decoration: none;
          border: 0;
          outline: none;
        }
        </style>
      
      </head>
      <body style="background-color: #e9ecef;">
      
        <!-- start preheader -->
        <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
          A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
        </div>
        <!-- end preheader -->
      
        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
      
          <!-- start logo -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 36px 24px;">
                    <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                      <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                    </a>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end logo -->
      
          <!-- start hero -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end hero -->
      
          <!-- start copy block -->
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="https://blogdesire.com">Paste</a>, you can safely delete this email.</p>
                  </td>
                </tr>
                <!-- end copy -->
      
                <!-- start button -->
                <tr>
                  <td align="left" bgcolor="#ffffff">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                <a href="${link}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">confirm email</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- end button -->
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                    <p style="margin: 0;"><a href="${Rlink}" target="_blank">send new email</a></p>
                  </td>
                </tr>
                <!-- end copy -->
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                    <p style="margin: 0;">Cheers,<br> Paste</p>
                  </td>
                </tr>
                <!-- end copy -->
      
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end copy block -->
      
          <!-- start footer -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      
                <!-- start permission -->
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
                  </td>
                </tr>
                <!-- end permission -->
      
                <!-- start unsubscribe -->
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">To stop receiving these emails, you can <a href="https://www.blogdesire.com" target="_blank">unsubscribe</a> at any time.</p>
                    <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
                  </td>
                </tr>
                <!-- end unsubscribe -->
      
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end footer -->
      
        </table>
        <!-- end body -->
      
      </body>
      </html>`
  await sendEmail(email, 'Welcome Supervisor admin ,plz confirm email', html);
  const user = await userModel.create({ email, userName, password, phone, role: 'Supervisor_Admin' });
  return res.status(201).json({ message: 'success', user: user._id });
})

export const updateSupervisorAdmin = asyncHandler(async (req, res, next) => {
  const admin = await userModel.findById(req.params.supervisorId);
  if (!admin) {
    return next(new Error(`invalid soervisor admin id ${req.params.supervisorId}`, { cause: 400 }));
  }
  const userName = req.body.userName?.toLowerCase();
  if (userName) {
    if (admin.userName === userName) {
      return next(new Error(`old name match new name`, { cause: 400 }));
    }
    if (await userModel.findOne({ userName })) {
      return next(new Error(`Duplicate admin name`, { cause: 400 }));
    }
    admin.userName = req.body.userName;
  }

  if (req.body.phone) {
    if (admin.phone === req.body.phone) {
      return next(new Error(`old name match new name`, { cause: 400 }));
    }
    if (await userModel.findOne({ phone: req.body.phone })) {
      return next(new Error(`Duplicate admin name`, { cause: 400 }));
    }
    admin.phone = req.body.phone;
  }

  if (req.body.status) {
    if (admin.status === req.body.status) {
      return next(new Error(`account admin already ${admin.status}`, { cause: 400 }));
    }
    admin.status = req.body.status;
  }

  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.App_Name}/profilePic` });
    await cloudinary.uploader.destroy(admin.image.public_id);
    admin.image = { public_id, secure_url };
  }

  await admin.save();
  return res.json({ message: 'success', admin });
})

export const deleteSupervisorAdmin = asyncHandler(async (req, res, next) => {
  const admin = await userModel.findByIdAndDelete(req.params.supervisorId);
  if (!admin) {
    return next(new Error('invalid id admin', { cause: 400 }));
  }
  return res.status(200).json({ message: 'success' });
})

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({ role: 'User' });
  return res.status(200).json({ message: 'success', users });
})

export const getAdmins = asyncHandler(async (req, res, next) => {
  const admins = await userModel.find({ role: 'Supervisor_Admin' });
  return res.status(200).json({ message: 'success', admins });
})

export const getSpecificUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.userId);
  return res.json({ message: 'success', user });
})

export const updatePassword = asyncHandler(async (req, res, next) => {
  let { oldPassword, newPassword } = req.body;
  const user = await userModel.findById(req.user?._id);
  if (!user) {
    return next(new Error(`user not exists`, { cause: 400 }));
  }
  const match = compare(oldPassword, user.password);
  if (!match) {
    return next(new Error("invalid password ", { cause: 400 }));
  }
  newPassword = hash(newPassword);
  await userModel.findByIdAndUpdate(req.user._id, { password: newPassword });
  return res.status(200).json({ message: 'success' });
})



