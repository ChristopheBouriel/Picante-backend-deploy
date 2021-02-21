# About this repo :

This is the back-end for a hot sauces rating app which has been made with Node.js, Express and MongoDB as a database.  
It was initially a project for their Junior Web Develepper training of Openclassrooms and you'll find the repository by clicking [here](https://github.com/ChristopheBouriel/So_Pekocko_Back).  
You can get more details about this project in my portfolio :  
https://portfolio-christophe-bouriel.netlify.app  

It has been modified in order to be deployed on Heroku : for instance, since images had to be storded on an other cloud service, some routes have been adaptated and some middlewares needed to be changed, like multer, or added, like cloudinary.  
But it has also been the opportunity for me to slightly improve the API and its code generaly speaking.  

## The API

In order to have a back-end as safe as I could given my knowledge on the moment, I tried to follow the recommendations of OWASP concerning the points on which the developper can take part. 
I installed packages downloaded from the npm registry, I wrote my own middlewares for user's inputs validation, but I also added verifications on some routes depending on the type of the request : for example, in order to be sure that the user wanting to modify or delete a sauce is the same one who created it.  


## The packages for security

The following packages have been used :
* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [xss-filters](https://www.npmjs.com/package/xss-filters)
* [helmet](https://www.npmjs.com/package/helmet)
* [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)
* [mongoose-validator](https://www.npmjs.com/package/mongoose-validator)*

*Well, this last one isn't usefull since in the end I preferred to make my own validators and it is employed only to check the email format.  


## The whole app
  
The front-end is hosted on Netlify and you can find the corresponding repository by clicking [here](https://github.com/ChristopheBouriel/Picante-frontend-deploy). The data base is on MongoDB Atlas, while the images are stored on Cloudinary.  
So you can test the app by connecting at this address :  
https://picante.netlify.app


