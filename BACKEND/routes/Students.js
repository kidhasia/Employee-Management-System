// const router = require ('express').Router();    // Import express
// let Student = require ('../models/Student');  // Import Student model

// https://localhost:5002/Student/

// router.route("/add").get((req, res) => {    // Get all students
    
//     const name = req.body.name;
//     const age = Number(req.body.age);
//     const gender = req.body.gender;

//     const newStudent = new Student({ // Create a new student
//         name,
//         age,
//         gender
//     });

//     newStudent.save().then(() => {  // Save the new student
//         res.json("Student added");
//     }
//     ).catch((err) => {
//         console.log(err);
//     });

// });
// https://localhost:5002/Student/display
// router.route("/").get((req, res) => {    // Get all students
//     Student.find().then((students) => {
//         res.json(students);
//     }).catch((err) => {
//         console.log(err);
//     });
// });

// https://localhost:5002/Student/update

// router.route("/update/:id").put(async (req, res) => {    // Update a student
//         let userId = req.params.id;
//         const {name, age, gender} = req.body;

//         const updateStudent = {
//             name,
//             age,
//             gender}
    
//         const update = await Student.findByIdAndUpdate(userId, updateStudent).then(() => {
//             res.status(200).send({status: "User updated"});
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).send({status: "Error with updating data", error: err.message});
//         });
// });

// router.route("/delete/:id").delete(async (req, res) => {    // Delete a student by ID
//     let userId = req.params.id;
//     await Student.findByIdAndDelete(userId).then(() => {
//         res.status(200).send({status: "User deleted"});
//     }).catch((err) => {
//         console.log(err.message);
//         res.status(500).send({status: "Error with delete user", error: err.message});
//     });
// });

// router.route("/get/:id").get(async (req, res) => {    // Get a student by ID
//     let userId = req.params.id;
//     const user = await Student.findById(userId).then(() => {
//         res.status(200).send({status: "User fetched", user});
//     }).catch((err) => {
//         console.log(err.message);
//         res.status(500).send({status: "Error with get user", error: err.message});
//     });
// }   );



// module.exports = router; // Export router

const router = require('express').Router(); // Import express
let Student = require('../models/Student'); // Import Student model

// Add student (Changed to POST)
router.route("/add").post((req, res) => {    
    const { name, age, gender } = req.body;

    const newStudent = new Student({ name, age, gender });

    newStudent.save()
        .then(() => res.json("Student added"))
        .catch(err => console.log(err));
});

// Get all students
router.route("/").get((req, res) => {    
    Student.find()
        .then(students => res.json(students))
        .catch(err => console.log(err));
});

// Update student
router.route("/update/:id").put(async (req, res) => {    
    let userId = req.params.id;
    const { name, age, gender } = req.body;

    const updateStudent = { name, age, gender };

    await Student.findByIdAndUpdate(userId, updateStudent)
        .then(() => res.status(200).send({ status: "User updated" }))
        .catch(err => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });
});

// Delete student
router.route("/delete/:id").delete(async (req, res) => {    
    let userId = req.params.id;
    
    await Student.findByIdAndDelete(userId)
        .then(() => res.status(200).send({ status: "User deleted" }))
        .catch(err => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete user", error: err.message });
        });
});

// Get student by ID (Fixed `.then()` usage)
router.route("/get/:id").get(async (req, res) => {    
    let userId = req.params.id;
    
    await Student.findById(userId)
        .then(user => res.status(200).send({ status: "User fetched", user }))
        .catch(err => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });
        });
});

module.exports = router; // Export router
