const mongoose = require("mongoose");

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/enginotes")
.then(()=>console.log("MongoDB connected for migration"))
.catch(err=>console.log(err));

// Import model
const Note = require("./models/Note");

async function migrate() {
  try {

    const notes = [

      {
        title: "M2",
        subject: "Mathematics",
        branch: "CSE",
        semester: 2,
        link: "https://drive.google.com/file/d/1ZgCdcxrZRfrstL9PpwJs_IKlNaEwJFAz/view",
        downloads: 12,
        isApproved: true,
        uploadedBy: "manikantasmartlove@gmail.com"
      },

      {
        title: "BEFA Notes with Important Questions",
        subject: "BEFA",
        branch: "OTHER",
        semester: 0,
        link: "https://drive.google.com/file/d/1vUNrE9vahcXRtrOOi4rttyeqm5A1JxoY/view",
        downloads: 1,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "Probability & Statistics Assignment 1",
        subject: "P&S",
        branch: "ALL",
        semester: 0,
        link: "https://drive.google.com/file/d/1F4Or0ruYZUpLgLEUYqD-P_oOAT9toZV4/view",
        downloads: 0,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "Computer Networks Module-1",
        subject: "Computer Networks",
        branch: "CSE",
        semester: 4,
        link: "https://docs.google.com/spreadsheets/d/10ed6MokHlbSHBOh-h2HHnBR-a2oAkC10/edit",
        downloads: 22,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "P&S Important Formulas",
        subject: "P&S",
        branch: "CSE",
        semester: 4,
        link: "https://drive.google.com/file/d/1pLzSDxZ4ZQqMuSYV7eg16mBUnXsE2SKR/view",
        downloads: 3,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "Discrete Maths Notes",
        subject: "Discrete Mathematics",
        branch: "CSE",
        semester: 3,
        link: "https://drive.google.com/file/d/1qbkGNHci7c2taVPK2B8WjywkDrfRa7rt/view",
        downloads: 2,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "P&S Assignment 1 Set 2",
        subject: "P&S",
        branch: "ALL",
        semester: 0,
        link: "https://drive.google.com/file/d/1PsmiObUS08_nXk7jvkvAQEfinjiQK0O4/view",
        downloads: 3,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "BDA Unit-3 Notes",
        subject: "BDA",
        branch: "OTHER",
        semester: 1,
        link: "https://drive.google.com/file/d/18Y1bwfiYPK2XJ-okQpLgu835EvexHVWv/view",
        downloads: 4,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "CN Mid 1 2 Marks",
        subject: "Computer Networks",
        branch: "CSE",
        semester: 4,
        link: "https://drive.google.com/file/d/1QC7SmjTaTSSQIvB3sSmD8fZW1RPn4wOK/view",
        downloads: 6,
        isApproved: true,
        uploadedBy: "pushkarajreddy323@gmail.com"
      },

      {
        title: "Machine Learning Unit-1",
        subject: "Machine Learning",
        branch: "OTHER",
        semester: 1,
        link: "https://drive.google.com/file/d/18bmLpDQL08edbYleAeHf-WVi7Yi-Ulog/view",
        downloads: 2,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "COA Unit 1",
        subject: "COA",
        branch: "CSE",
        semester: 3,
        link: "https://drive.google.com/file/d/1KSvgf3ygsx8PpZIrRpCEfE5zDkDnZRqM/view",
        downloads: 2,
        isApproved: true,
        uploadedBy: "rithwikgoud006@gmail.com"
      },

      {
        title: "Python Notes",
        subject: "Python",
        branch: "CSE",
        semester: 2,
        link: "https://drive.google.com/file/d/14pPdsH4Qpk9HQbPT0tybr004PwzV0HLY/view",
        downloads: 0,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "M1",
        subject: "Mathematics",
        branch: "CSE",
        semester: 1,
        link: "https://drive.google.com/file/d/1_hfvjm6m1_p9KYbLcoq0gLpzuZ3bViGe/view",
        downloads: 5,
        isApproved: true,
        uploadedBy: "manikantasmartlove@gmail.com"
      },

      {
        title: "OS Mid Answers",
        subject: "Operating Systems",
        branch: "CSE",
        semester: 4,
        link: "https://drive.google.com/file/d/12aP4jkXYerXaXAVNK8TTjTZzKRplCNbS/view",
        downloads: 4,
        isApproved: true,
        uploadedBy: "mohammadakhil12@gmail.com"
      },

      {
        title: "BEEE Module-2",
        subject: "BEEE",
        branch: "CSE",
        semester: 1,
        link: "https://drive.google.com/file/d/1yzSkDTFuAi33YYZZr_ZsxR8bMUJsHh16/view",
        downloads: 3,
        isApproved: true,
        uploadedBy: "madhu123@gmail.com"
      },

      {
        title: "COA Unit 5",
        subject: "COA",
        branch: "CSE",
        semester: 3,
        link: "https://drive.google.com/file/d/16WxcAGMxfcxjRnQqnpA3yOkOfZPXtKQ0/view",
        downloads: 2,
        isApproved: true,
        uploadedBy: "rithwikgoud006@gmail.com"
      },

      {
        title: "Java Assignment 2",
        subject: "Java",
        branch: "CSE",
        semester: 3,
        link: "https://drive.google.com/file/d/1pzOQO6vJHnoZkDEBObdkV8bZqOQd-yKf/view",
        downloads: 0,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "DAA Unit 2 Notes",
        subject: "DAA",
        branch: "CSE",
        semester: 4,
        link: "https://drive.google.com/file/d/1cMwbONhbf20wY6yRhB3zp4pJfbryyWYs/view",
        downloads: 2,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "ATS Friendly Projects",
        subject: "Projects",
        branch: "CSE",
        semester: 6,
        link: "https://drive.google.com/file/d/1feAKv-Kx1e4QXwohbKXJuVmq-8LVsz7Q/view",
        downloads: 0,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },

      {
        title: "HTML Notes",
        subject: "HTML",
        branch: "CSE",
        semester: 1,
        link: "https://drive.google.com/file/d/1HGQnZv29g_SR_BZROoE4IvWamyrNFNke/view",
        downloads: 0,
        isApproved: true,
        uploadedBy: "mohammadakhil00@gmail.com"
      },
      // NEW DATA (converted + cleaned)

{
  title: "DBMS Assignment-1",
  subject: "DBMS",
  branch: "CSE",
  semester: 3,
  link: "https://drive.google.com/file/d/1I4Lmm1EIH2ACm6DfKOXw7fiRzY7rAAbG/view",
  downloads: 1,
  isApproved: true,
  uploadedBy: "mohammadakhil00@gmail.com"
},

{
  title: "DAA Mid 1",
  subject: "DAA",
  branch: "CSE",
  semester: 4,
  link: "https://drive.google.com/file/d/1_pYmD7UdKwCD4BL5SDJ1X6q_1qVWbtvs/view",
  downloads: 46,
  isApproved: true,
  uploadedBy: "mohammadakhil12@gmail.com"
},

{
  title: "BEFA Notes (All Modules)",
  subject: "BEFA",
  branch: "CSE",
  semester: 3,
  link: "https://drive.google.com/file/d/1vUNrE9vahcXRtrOOi4rttyeqm5A1JxoY/view",
  downloads: 4,
  isApproved: true,
  uploadedBy: "mohammadakhil00@gmail.com"
},

{
  title: "Inheritance in Java",
  subject: "Java",
  branch: "CSE",
  semester: 3,
  link: "https://drive.google.com/file/d/10ycNw_SEbw0N9BExgCMBkV6VUN8udCx5/view",
  downloads: 1,
  isApproved: true,
  uploadedBy: "mohammadakhil00@gmail.com"
},

{
  title: "Big Data Analytics Unit-5",
  subject: "BDA",
  branch: "OTHER",
  semester: 1,
  link: "https://drive.google.com/file/d/1Gt4lQlDJYjJL_-jq2s0DXsnb8EUsaLz5/view",
  downloads: 2,
  isApproved: true,
  uploadedBy: "mohammadakhil00@gmail.com"
},

{
  title: "Data Structures in C Notes",
  subject: "DSA",
  branch: "CSE",
  semester: 2,
  link: "https://drive.google.com/file/d/1Ruhb9suo9XcyuWDFByk8pBKC_7INGUBf/view",
  downloads: 3,
  isApproved: true,
  uploadedBy: "piracy123@gmail.com"
},

{
  title: "FLAT Assignment 2",
  subject: "FLAT",
  branch: "CSE",
  semester: 4,
  link: "https://drive.google.com/file/d/1JayUmk9y-ik6AoUDH7kHz6e8JxNTTrSM/view",
  downloads: 48,
  isApproved: true,
  uploadedBy: "mohammadakhil12@gmail.com"
},

{
  title: "P&S Mid-1 Q&S",
  subject: "P&S",
  branch: "ALL",
  semester: 4,
  link: "https://drive.google.com/file/d/14vmLzIM38wFUCeEbt13N0X7l4dztQoQw/view",
  downloads: 79,
  isApproved: true,
  uploadedBy: "mohammadakhil12@gmail.com"
},

{
  title: "Python Notes",
  subject: "Python",
  branch: "CSE",
  semester: 2,
  link: "https://drive.google.com/file/d/1CDLd44QfsuPVCeTuwwRm0xL913mYV04n/view",
  downloads: 0,
  isApproved: true,
  uploadedBy: "mohammadakhil00@gmail.com"
},

{
  title: "CN Mid 1 Solutions",
  subject: "Computer Networks",
  branch: "CSE",
  semester: 4,
  link: "https://drive.google.com/file/d/1ueiOMcWEfw679Cxk6oXw8JQ7692ftDx8/view",
  downloads: 14,
  isApproved: true,
  uploadedBy: "mohammadakhil12@gmail.com"
},

{
  title: "FLAT Mid-1 Solutions",
  subject: "FLAT",
  branch: "CSE",
  semester: 4,
  link: "https://drive.google.com/file/d/1ub-40jrMxOpokJzw5DeAxdKN1VnObqU3/view",
  downloads: 35,
  isApproved: true,
  uploadedBy: "mohammadakhil12@gmail.com"
},

{
  title: "BME Notes",
  subject: "BME",
  branch: "MECH",
  semester: 0,
  link: "https://drive.google.com/file/d/1CMtttnsir7sPzgyMVLZ3ER2WyIhVcxDc/view",
  downloads: 2,
  isApproved: true,
  uploadedBy: "mohammadakhil00@gmail.com"
},

{
  title: "DAA Unit 2 Handwritten Notes",
  subject: "DAA",
  branch: "CSE",
  semester: 4,
  link: "https://drive.google.com/file/d/11LG7BQ_UXNc8t8zBn0xTpbcVgHprTS0r/view",
  downloads: 9,
  isApproved: true,
  uploadedBy: "mohammadakhil00@gmail.com"
},

{
  title: "FLAT Assignment 1",
  subject: "FLAT",
  branch: "CSE",
  semester: 4,
  link: "https://drive.google.com/file/d/1lk_JMAbR3-V0FyIosyM_0xWHfJBIiZn5/view",
  downloads: 29,
  isApproved: true,
  uploadedBy: "mohammadakhil00@gmail.com"
},

{
  title: "Engineering Mechanics Notes",
  subject: "Engineering Mechanics",
  branch: "MECH",
  semester: 0,
  link: "https://drive.google.com/file/d/1Cfm6ewAIdYlpq_zzbhOdzM7yzy2oHb9g/view",
  downloads: 5,
  isApproved: true,
  uploadedBy: "mohammadakhil00@gmail.com"
}

    ];

    await Note.insertMany(notes);

    console.log("All data migrated successfully");
    process.exit();

  } catch (err) {
    console.log("Migration error:", err);
    process.exit(1);
  }
}

migrate();