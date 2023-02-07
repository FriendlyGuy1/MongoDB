require('dotenv').config()
const mongoose = require("mongoose")

mongoose.set('strictQuery', true);

mongoose.connect(`${process.env.MONGO_CONNECT}`)
    .then(()=> console.log("Connected!"))
    .catch(error => console.error("Failed to Connect..", error))


const FirstSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})


const FirstModel = mongoose.model("Course", FirstSchema);

async function CreatingCourse(){
    const FirstCourse = new FirstModel({
        name: "Random3",
        author: "Peter",
        tags: ["frontend", "backend"],
        isPublished: true
    })
    const result = await FirstCourse.save();
    console.log(result)
}

// CreatingCourse()



let FindCourse = async ()=>{
    const courses = await FirstModel.find()
    console.log(courses)
}

// FindCourse()


let SortCourses = async () => {
    const courses = await FirstModel
    .find({tags: /end$/i})
    .skip(1)
    console.log(courses)
}

// SortCourses()

let updateCourse = async (id) => {
    const courses = await FirstModel.findById(id);

    courses.author = "Updated author"

    const result = await courses.save()
    console.log(result)
}

// updateCourse("63e20258557e220e7e1d0853")


let RemoveCourse = async (id) => {
    const results = await FirstModel.deleteOne({_id: id})
    console.log(results)
}


// RemoveCourse("63e202d6e8b0c9ced990a30a")

let RemoveCourses = async () => {
    const courses = await FirstModel.deleteMany({
        name:  /.*and.*/
    })
    console.log(courses)
}

// RemoveCourses()



