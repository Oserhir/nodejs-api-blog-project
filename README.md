# Blog API Application Project

Build a Blog API that can be used to manage posts and comments as well as go through the registration and logging user process using a JWT token

## Tech Stack

**Server:** Node, Express, MongoDB, Mongoose, JWT

# API FEATURES

- ✅ Authentication using JSON Web tokens (JWT) & Authorization
- ✅ Post CRUD operations
- ✅ Category CRUD operations
- ✅ Comment functionality
- ✅ Profile photo uploaded
- ✅ Update password
- ✅ System blocking user if inactive for 30 days
- ✅ Admin can block a user
- ✅ A user can block different users
- ✅ A user who block another user cannot see his/her posts
- ✅ Check if a user is active or not
- ✅ Check last date a user was active
- ✅ Changing user award base on number of posts created by the user
- ✅ A user can follow and unfollow another user
- ✅ Get all users who views someone's profile
- ✅ Admin can unblock a blocked user
- ✅ A user can close his/her account

</br>
</br>

![blogAPI](https://user-images.githubusercontent.com/82850895/215177113-97ec1687-c513-4b87-af33-bf98a25ae2a1.png)

# ENDPOINTS

- [Authentication](#Authentication)

  - [ Sign Up ](#Sign-Up)
  - [ Login ](#Login)

- [Logged Users](#Logged-Users)

  - [Update your profile](#Update-your-profile)
  - [Update your password](#Update-user-password)
  - [Delete your account](#Delete-your-account)
  - [Get my profile](#get-my-profile)
  - [Get all users](#Get-all-users)
  - [Upload Profile Photo](#Upload-Profile-Photo)
  - [View a user profile Count](#view-a-user-profile)
  - [Following a user](#Following-a-user)
  - [UnFollowing-a-user](#UnFollowing-a-user)
  - [Block another user](#Block-user)
  - [Unblock another user](#Unblock-user)

- [Admin](#admin)

  - [Admin create a user](#Admin-create-a-user)
  - [Admin delete a user](#Admin-delete-a-user)
  - [Admin blocking a user](#Admin-blocking-a-user)
  - [Admin Unblocking a user](#Admin-unblocking-a-user)

- [Posts](#Posts)

  - [Create Post](#Create-Post)
  - [Update Post](#Update-Post)
  - [Get All Posts](#Get-All-Posts)
  - [Get Single Post](#Get-Single-Post)
  - [Delete Post](#Delete-Post)

- [Comments](#Comments)

  - [Create comment](#Create-Comment)
  - [Update comment](#Update-Comment)
  - [Delete comment](#Delete-Comment)
  - [Get All comments](#Get-All-Comment)
  - [Get Single comment](#Get-Single-Comment)

- [Categories](#Categories)
  - [Create category](#Create-Category)
  - [Update category](#Update-Category)
  - [Delete category](#Delete-Category)
  - [Get All category](#Get-All-Category)
  - [Get Single category](#Get-Single-Category)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL` , `JWT_SECRET` , `CLOUDINARY_CLOUD_NAME` , `CLOUDINARY_API_KEY` , `CLOUDINARY_API_KEY` , `CLOUDINARY_API_SECRET_KEY`

##### BaseURL = `https://test.onrender.com/`

# API Authentication

Some endpoints may require authentication for example. To create a create/delete/update post, you need to register your API client and obtain an access token.

The endpoints that require authentication expect a bearer token sent in the `Authorization header`.

**Example**:

`Authorization: Bearer YOUR TOKEN`
