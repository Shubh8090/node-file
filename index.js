const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express();
const port = 8000;

const filesFolder = path.join(__dirname, 'node');
if (!fs.existsSync(filesFolder)) {
  fs.mkdirSync(filesFolder);
}

// Endpoint to create a text file with the current timestamp
app.get("/createFile",(req,res) => {
      const timestamp = new Date()
      const currentDate = timestamp.getDate();
      const currentMonth = timestamp.getMonth();
      const currentYear = timestamp.getFullYear();
      const currentHrs = timestamp.getHours();
      const currentMin = timestamp.getMinutes();
      const filename = `${currentDate}-${currentMonth+1}-${currentYear}-${currentHrs}-${currentMin}.txt`;
      
      console.log(filename)

      fs.writeFile(`node/${filename}` ,timestamp.toISOString(),(err)=> {
          if(err){
            console.log(err)
            return res.status(500).send("Error Occured While Creating the File")
          }
          res.send("File Created Successfully")
      })
    
})


// Endpoint to retrieve all text files in the 'files' folder
app.get('/getAllFiles', (req, res) => {
   
    fs.readdir(filesFolder, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading folder.');
      }
      res.json(files);
    });
  });


app.listen(port,()=>{
    console.log(`The server is running in the port:${port}`)
})