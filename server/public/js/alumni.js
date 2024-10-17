// Sample alumni data (same as before)
const alumniData = [
    {
      name: "John Doe",
      age: 26,
      gender: "Male",
      batch: "2020",
      branch: "Computer Science",
      company: "Google",
      linkedin: "https://linkedin.com/in/johndoe"
    },
    {
      name: "Jane Smith",
      age: 28,
      gender: "Female",
      batch: "2019",
      branch: "Mechanical Engineering",
      company: "Tesla",
      linkedin: "https://linkedin.com/in/janesmith"
    },
    {
      name: "Sam Johnson",
      age: 25,
      gender: "Male",
      batch: "2021",
      branch: "Civil Engineering",
      company: "L&T",
      linkedin: "https://linkedin.com/in/samjohnson"
    },
    {
      name: "Alice Williams",
      age: 27,
      gender: "Female",
      batch: "2018",
      branch: "Electronics Engineering",
      company: "Intel",
      linkedin: "https://linkedin.com/in/alicewilliams"
    },
    {
      name: "Mark Taylor",
      age: 29,
      gender: "Male",
      batch: "2017",
      branch: "Electrical Engineering",
      company: "ABB",
      linkedin: "https://linkedin.com/in/marktaylor"
    },
    {
      name: "Emily Brown",
      age: 30,
      gender: "Female",
      batch: "2016",
      branch: "Computer Science",
      company: "Facebook",
      linkedin: "https://linkedin.com/in/emilybrown"
    },
    {
      name: "Michael Green",
      age: 27,
      gender: "Male",
      batch: "2020",
      branch: "Mechanical Engineering",
      company: "Ford",
      linkedin: "https://linkedin.com/in/michaelgreen"
    },
    {
      name: "Olivia Clark",
      age: 28,
      gender: "Female",
      batch: "2019",
      branch: "Civil Engineering",
      company: "Bechtel",
      linkedin: "https://linkedin.com/in/oliviaclark"
    },
    {
      name: "James Lewis",
      age: 29,
      gender: "Male",
      batch: "2017",
      branch: "Electronics Engineering",
      company: "Sony",
      linkedin: "https://linkedin.com/in/jameslewis"
    },
    {
      name: "Sophia Davis",
      age: 26,
      gender: "Female",
      batch: "2020",
      branch: "Computer Science",
      company: "Amazon",
      linkedin: "https://linkedin.com/in/sophiadavis"
    }
  ];
  
  // Function to generate alumni cards dynamically
  const alumniCardsContainer = document.getElementById("alumni-cards");
  
  function generateAlumniCards(data) {
    alumniCardsContainer.innerHTML = ""; // Clear existing cards
    data.forEach((alumni, index) => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-lg shadow-lg p-6 text-center";
      card.innerHTML = `
        <img src="alumni${index + 1}.jpg" alt="${alumni.name}" class="w-24 h-24 rounded-full mx-auto object-cover">
        <h3 class="text-xl font-semibold mt-4">${alumni.name}</h3>
        <p class="text-gray-600">Batch: ${alumni.batch}</p>
        <p class="text-gray-600">Branch: ${alumni.branch}</p>
        <p class="text-gray-600">Company: ${alumni.company}</p>
        <a href="${alumni.linkedin}" target="_blank" class="text-blue-500 mt-2 block">LinkedIn Profile</a>
        <button class="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 view-details" data-index="${index}">View Details</button>
      `;
      alumniCardsContainer.appendChild(card);
    });
  }
  
  // Initial load of alumni cards (load all alumni when page loads)
  generateAlumniCards(alumniData); 
  
  // Modal functionality
  const modal = document.getElementById("alumni-modal");
  const modalClose = document.querySelector(".close");
  const alumniCards = document.querySelectorAll(".view-details");
  
  function openModal(index) {
    const alumni = alumniData[index];
  
    // Populate modal with alumni details
    document.getElementById("alumni-name").textContent = alumni.name;
    document.getElementById("alumni-age").textContent = `Age: ${alumni.age}`;
    document.getElementById("alumni-gender").textContent = `Gender: ${alumni.gender}`;
    document.getElementById("alumni-batch").textContent = `Batch: ${alumni.batch}`;
    document.getElementById("alumni-branch").textContent = `Branch: ${alumni.branch}`;
    document.getElementById("alumni-company").textContent = `Company: ${alumni.company}`;
    document.getElementById("alumni-linkedin").setAttribute("href", alumni.linkedin);
  
    // Show modal
    modal.classList.remove("hidden");
  }
  
  // Close modal
  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  
  // Close modal if user clicks outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
  
  // Search and Filters Functionality
  const searchInput = document.querySelector("input[type='text']");
  const batchFilter = document.querySelector("select:nth-of-type(1)");
  const branchFilter = document.querySelector("select:nth-of-type(2)");
  const applyButton = document.querySelector("button");
  
  applyButton.addEventListener("click", () => {
    const searchQuery = searchInput.value.toLowerCase();
    const batchQuery = batchFilter.value;
    const branchQuery = branchFilter.value;
  
    const filteredAlumni = alumniData.filter((alumni) => {
      const matchesSearch = alumni.name.toLowerCase().includes(searchQuery);
      const matchesBatch = batchQuery === "" || alumni.batch === batchQuery;
      const matchesBranch = branchQuery === "" || alumni.branch === branchQuery;
      return matchesSearch && matchesBatch && matchesBranch;
    });
  
    // Regenerate cards based on the filtered data
    generateAlumniCards(filteredAlumni);
  });
  

  