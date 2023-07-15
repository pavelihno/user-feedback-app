
# User Feedback App

User Feedback App is a comprehensive application that allows users to share their opinions, ratings, and feedback on various products and services

## Functionality 

Function|Description
--------|--------
User registration and authentication|Users can login and register by providing their username, email, and password
Product category management|Administrators have the ability to add new product categories to the system
Product management|Users can add new products to the system. Other users can review and confirm the addition of the product
Writing reviews|Users can leave reviews for products and rate the product on a scale of 1 to 5
Adding comments to reviews|Users have the ability to add comments to reviews made by other users
Administrative access|Application implements a role-based access control system. Administrators can view, edit, and delete products, reviews, and comments, block users
Search|Users can search for products and reviews using keywords
 
## Tech Stack

**Client:** Node, React, Redux, MUI

**Server:** Node, Express

**Database**: MongoDB


## Data model

![Data model](https://raw.githubusercontent.com/pavelihno/user-feedback-app/main/diagrams/data_model.png)

## Architecture

### Docker deployment

![Docker deployment](https://raw.githubusercontent.com/pavelihno/user-feedback-app/main/diagrams/app_structure.png)

### Render deployment

![Render deployment](https://raw.githubusercontent.com/pavelihno/user-feedback-app/main/diagrams/app_structure_cloud.png)
## Deployment

```bash
  docker-compose up
```

