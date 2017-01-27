const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view Engine','hbs');
app.use(express.static(__dirname + '/display'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
      if(err)
        console.log('unable to write the log');
    });
    console.log(log);
    next();
});

// app.use((req,res,next) => {
//   res.render('marsh.hbs',{
//     PageTitle: 'Error Page',
//     message: 'Error Page come back later'
//   });
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('UpperCase', (text) => {
    return text.toUpperCase();
})

app.get('/', (req,res) => {
  res.render('home.hbs',{
    PageHeader: 'HomePage',
    PageHeader: 'Do not Click anywhere on this page'
  })
});

app.get('/about' , (req,res) => {
  res.render('about.hbs', {
    PageHeader: 'About Page',
    message: 'go back to home page'
  });
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
