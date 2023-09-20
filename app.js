const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("650b7b48152ab6b3697f856a")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://mongotarun:ySFGEdp1zxYaoyZG@cluster0.mqkhsto.mongodb.net/shop?retryWrites=true&w=majority')
.then(result =>{
  User.findOne().then(user=>{
    if(!user){
      const user = new User({
        name : 'Max',
        email: 'max@gmail.com',
        cart:{
          items:[]
        }
      });
      user.save()
    }
  })
  
  app.listen(3000);
  console.log('connected with mongoose');
})
.catch(err =>{
  console.log(err);
})
