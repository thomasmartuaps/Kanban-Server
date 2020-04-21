# KanChalk-Server

Simple kanban application with distinct client visual. Designed for small organizations. Also has a real-time feature, allowing you to collaborate with other users easily. Contact me if you want a custom-made kanban application based on this app.

## TASKS ROUTES

## Create Task

Store new task item to the database that will belong to the user currently signed in.

**URL**:
/tasks

**Method:**
POST

**Request Header:**
{
"token": [string] 
}

**Request Body:**
{
	"title: [integer],
	"description": [string],
	"category": [string],
	"UserId": [string]
}

**Response:**
{
	"id": [integer],
	"title": [string],
	"description: [string],
	"category": [string date],
	"UserId": [integer] 
}

## Read Task

Read all existing task items, regardless of who owns the items.

**URL:**
/tasks

**Method:**
GET

**Request Header:**
None

**Request Body:**
None

**Response:**
[
	{
	"id": [integer],
	"title": [string],
	"description: [string],
	"category": [string date],
	"UserId": [integer] 
},
	{
	"id": [integer],
	"title": [string],
	"description: [string],
	"category": [string date],
	"UserId": [integer] 
},
	//etc 
]

## Update Task

Modify an existing task item on the database.

**URL**:
/tasks/:id

**Method:**
PUT

**Request Header:**
{
"token": [string] 
}

**Request Body:**
{
	"title: [integer],
	"description": [string],
	"category": [string],
}

**Response:**
{
	"id": [integer],
	"title": [string],
	"description: [string],
	"category": [string date],
	"UserId": [integer] 
}

## Change Category

Change the category of an existing task item on the database.

**URL**:
/tasks/:id

**Method:**
PATCH

**Request Header:**
{
"token": [string] 
}

**Request Body:**
{
	"category": [string],
}

**Response:**
{
	"id": [integer],
	"title": [string],
	"description: [string],
	"category": [string date],
	"UserId": [integer] 
}

## Destroy

Destroy a task item on the database.

**URL:**
/tasks/:id

**Method:**
DELETE

**Request** **Header:**
{
"token": [string]
}

**Request** **Body:**
None

**Response**:
{
	"message": "Item id ${req.params.id} has been deleted."
}

## USER ROUTES

## Register

Create a new user. Will also return a link for the adorable avatar API.

**URL:**
/register

**Method:**
POST

**Request** **Header:**
{
"token": [string]
}

**Request** **Body:**
{
	"email": [string],
	"password": [string],
}

**Response**:
{
	"email": [string],
	"token": [string],
	"avatar": [string]
}

## Login

Log in an existing user. Will also return a link for the adorable avatar API.

**URL:**
/login

**Method:**
POST

**Request** **Header:**
{
"token": [string]
}

**Request** **Body:**
{
	"email": [string],
	"password": [string],
}

**Response**:
{
	"email": [string],
	"token": [string],
	"avatar": [string]
}