// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // ----- LOGIN HANDLING -----
    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      
      const user = document.getElementById("username").value.trim();
      const pass = document.getElementById("password").value;
      
      // hard‑coded "valid" credentials
      const VALID_USER = "admin";
      const VALID_PASS = "secret123";
      
      if (user === VALID_USER && pass === VALID_PASS) {
        // hide login, show details form
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("detailsForm").style.display = "block";
      } else {
        alert("Invalid username or password.");
      }
    });
    
    // ----- OUTFIT GENERATOR -----
    document.getElementById("detailsForm").addEventListener("submit", function (e) {
      e.preventDefault();
      
      const gender   = document.getElementById("gender").value;
      const occasion = document.getElementById("occasion").value;
      const height   = parseInt(document.getElementById("height").value, 10);
      const weight   = parseInt(document.getElementById("weight").value, 10);
      const skinTone = document.getElementById("skinTone").value;
      
      // BMI‑based fit
      const bmi = weight / ((height / 100) ** 2);
      const fit = bmi < 19
        ? "Slim Fit"
        : bmi > 25
          ? "Loose Fit"
          : "Regular Fit";
      
      // predefined outfit options
      const outfits = {
        male: {
          Fair: {
            Wedding:    { shirt: "Sky Blue", pant: "Beige",       shoes: "Tan",      accessories: "Gold Watch" },
            Interview:  { shirt: "White",    pant: "Navy",        shoes: "Black",    accessories: "Minimalist Belt" },
            Casual:     { shirt: "Light Pink", pant: "Blue Jeans", shoes: "White Sneakers", accessories: "Leather Strap Watch" }
          },
          Wheatish: {
            Wedding:   { shirt: "Peach",       pant: "Dark Grey", shoes: "Brown",       accessories: "Gold Chain" },
            Interview: { shirt: "Sky Blue",    pant: "Charcoal",  shoes: "Black",       accessories: "Silver Tie Clip" },
            Casual:    { shirt: "Olive Green", pant: "Khaki",     shoes: "Tan Loafers", accessories: "Bracelet" }
          },
          Dark: {
            Wedding:   { shirt: "Maroon",     pant: "Black",   shoes: "Dark Brown", accessories: "Gold Cufflinks" },
            Interview: { shirt: "Light Grey", pant: "Navy",    shoes: "Black",      accessories: "Silver Pen" },
            Casual:    { shirt: "Mustard",    pant: "Denim Blue", shoes: "White",     accessories: "Neck Chain" }
          }
        },
        female: {
          Fair: {
            Wedding:   { dress: "Red Dress",            shoes: "Silver Heels", accessories: "Diamond Earrings" },
            Interview: { top: "White Blouse", skirt: "Black Pencil Skirt", shoes: "Black Heels", accessories: "Silver Necklace" },
            Casual:    { top: "Light Pink Blouse", jeans: "Blue Skinny Jeans", shoes: "White Flats", accessories: "Leather Handbag" }
          },
          Wheatish: {
            Wedding:   { dress: "Pink Dress",          shoes: "Gold Heels",   accessories: "Gold Bangles" },
            Interview: { top: "Cream Shirt",   trousers: "Dark Brown Pants", shoes: "Black Flats", accessories: "Pearl Earrings" },
            Casual:    { top: "Olive Green Shirt", jeans: "Beige Jeans", shoes: "Brown Loafers", accessories: "Casual Watch" }
          },
          Dark: {
            Wedding:   { dress: "Maroon Dress",       shoes: "Gold Sandals", accessories: "Gold Necklace" },
            Interview: { top: "Black Blouse", trousers: "Navy Pants", shoes: "Black Heels", accessories: "Silver Bracelet" },
            Casual:    { top: "Yellow T-shirt", skirt: "Blue Denim Skirt", shoes: "White Sneakers", accessories: "Stylish Backpack" }
          }
        }
      };
      
      // pick recommendation (fallback to Casual if missing)
      const rec = (outfits[gender][skinTone][occasion] || outfits[gender][skinTone]["Casual"]);
      
      // Specific images for each item type and color
      const itemImages = {
        shirts: {
          "Sky Blue": "https://brightandfly.in/cdn/shop/files/01SkyblueLilenKhadiSummerClubBrightAndFlyshirtformenwhiteblackpantmatchingshirt.jpg?v=1715845651",
          "White": "https://thehouseofrare.com/cdn/shop/files/NEUTONS-WHITE5174.jpg?v=1743587591",
          "Light Pink": "https://www.aristobrat.in/cdn/shop/products/PiqueShirt_PinkSalt_1.jpg?v=1741862537",
          "Peach": "https://via.placeholder.com/200x200?text=Peach+Shirt",
          "Olive Green": "https://via.placeholder.com/200x200?text=Olive+Green+Shirt",
          "Maroon": "https://via.placeholder.com/200x200?text=Maroon+Shirt",
          "Light Grey": "https://via.placeholder.com/200x200?text=Light+Grey+Shirt",
          "Mustard": "https://via.placeholder.com/200x200?text=Mustard+Shirt"
        },
        pants: {
          "Beige": "https://via.placeholder.com/200x200?text=Beige+Pants",
          "Navy": "https://via.placeholder.com/200x200?text=Navy+Pants",
          "Blue Jeans": "https://via.placeholder.com/200x200?text=Blue+Jeans",
          "Dark Grey": "https://via.placeholder.com/200x200?text=Dark+Grey+Pants",
          "Charcoal": "https://via.placeholder.com/200x200?text=Charcoal+Pants",
          "Khaki": "https://via.placeholder.com/200x200?text=Khaki+Pants",
          "Black": "https://via.placeholder.com/200x200?text=Black+Pants",
          "Denim Blue": "https://via.placeholder.com/200x200?text=Denim+Blue+Pants"
        },
        shoes: {
          "Tan": "https://via.placeholder.com/200x200?text=Tan+Shoes",
          "Black": "https://via.placeholder.com/200x200?text=Black+Shoes",
          "White Sneakers": "https://via.placeholder.com/200x200?text=White+Sneakers",
          "Brown": "https://via.placeholder.com/200x200?text=Brown+Shoes",
          "Tan Loafers": "https://via.placeholder.com/200x200?text=Tan+Loafers",
          "Dark Brown": "https://via.placeholder.com/200x200?text=Dark+Brown+Shoes",
          "White": "https://via.placeholder.com/200x200?text=White+Shoes",
          "Silver Heels": "https://via.placeholder.com/200x200?text=Silver+Heels",
          "Black Heels": "https://via.placeholder.com/200x200?text=Black+Heels",
          "White Flats": "https://via.placeholder.com/200x200?text=White+Flats",
          "Gold Heels": "https://via.placeholder.com/200x200?text=Gold+Heels", 
          "Black Flats": "https://via.placeholder.com/200x200?text=Black+Flats",
          "Brown Loafers": "https://via.placeholder.com/200x200?text=Brown+Loafers",
          "Gold Sandals": "https://via.placeholder.com/200x200?text=Gold+Sandals"
        },
        accessories: {
          "Gold Watch": "https://via.placeholder.com/200x200?text=Gold+Watch",
          "Minimalist Belt": "https://via.placeholder.com/200x200?text=Minimalist+Belt",
          "Leather Strap Watch": "https://via.placeholder.com/200x200?text=Leather+Watch",
          "Gold Chain": "https://via.placeholder.com/200x200?text=Gold+Chain",
          "Silver Tie Clip": "https://via.placeholder.com/200x200?text=Silver+Tie+Clip",
          "Bracelet": "https://via.placeholder.com/200x200?text=Bracelet",
          "Gold Cufflinks": "https://via.placeholder.com/200x200?text=Gold+Cufflinks",
          "Silver Pen": "https://via.placeholder.com/200x200?text=Silver+Pen",
          "Neck Chain": "https://via.placeholder.com/200x200?text=Neck+Chain",
          "Diamond Earrings": "https://via.placeholder.com/200x200?text=Diamond+Earrings",
          "Silver Necklace": "https://via.placeholder.com/200x200?text=Silver+Necklace",
          "Leather Handbag": "https://via.placeholder.com/200x200?text=Leather+Handbag",
          "Gold Bangles": "https://via.placeholder.com/200x200?text=Gold+Bangles",
          "Pearl Earrings": "https://via.placeholder.com/200x200?text=Pearl+Earrings",
          "Casual Watch": "https://via.placeholder.com/200x200?text=Casual+Watch",
          "Gold Necklace": "https://via.placeholder.com/200x200?text=Gold+Necklace",
          "Silver Bracelet": "https://via.placeholder.com/200x200?text=Silver+Bracelet",
          "Stylish Backpack": "https://via.placeholder.com/200x200?text=Stylish+Backpack"
        },
        dresses: {
          "Red Dress": "https://via.placeholder.com/200x200?text=Red+Dress",
          "Pink Dress": "https://via.placeholder.com/200x200?text=Pink+Dress",
          "Maroon Dress": "https://via.placeholder.com/200x200?text=Maroon+Dress"
        },
        tops: {
          "White Blouse": "https://via.placeholder.com/200x200?text=White+Blouse",
          "Light Pink Blouse": "https://via.placeholder.com/200x200?text=Light+Pink+Blouse",
          "Cream Shirt": "https://via.placeholder.com/200x200?text=Cream+Shirt",
          "Olive Green Shirt": "https://via.placeholder.com/200x200?text=Olive+Green+Shirt",
          "Black Blouse": "https://via.placeholder.com/200x200?text=Black+Blouse",
          "Yellow T-shirt": "https://via.placeholder.com/200x200?text=Yellow+T-shirt"
        },
        bottoms: {
          "Black Pencil Skirt": "https://via.placeholder.com/200x200?text=Black+Pencil+Skirt",
          "Blue Skinny Jeans": "https://via.placeholder.com/200x200?text=Blue+Skinny+Jeans",
          "Dark Brown Pants": "https://via.placeholder.com/200x200?text=Dark+Brown+Pants",
          "Beige Jeans": "https://via.placeholder.com/200x200?text=Beige+Jeans",
          "Navy Pants": "https://via.placeholder.com/200x200?text=Navy+Pants",
          "Blue Denim Skirt": "https://via.placeholder.com/200x200?text=Blue+Denim+Skirt"
        }
      };
      
      // Get correct image based on item type and color
      function getItemImage(type, item) {
        switch(type) {
          case 'shirt':
            return itemImages.shirts[item] || `https://via.placeholder.com/200x200?text=${item}+Shirt`;
          case 'pant':
            return itemImages.pants[item] || `https://via.placeholder.com/200x200?text=${item}+Pants`;
          case 'shoes':
            return itemImages.shoes[item] || `https://via.placeholder.com/200x200?text=${item}`;
          case 'accessories':
            return itemImages.accessories[item] || `https://via.placeholder.com/200x200?text=${item}`;
          case 'dress':
            return itemImages.dresses[item] || `https://via.placeholder.com/200x200?text=${item}`;
          case 'top':
            return itemImages.tops[item] || `https://via.placeholder.com/200x200?text=${item}`;
          case 'bottom':
            return itemImages.bottoms[item] || `https://via.placeholder.com/200x200?text=${item}`;
          default:
            return `https://via.placeholder.com/200x200?text=${item}`;
        }
      }
      
      // build HTML output
      const output = document.getElementById("output");
      output.style.display = "block";
      let html = `<h3>Outfit for ${occasion}</h3><p><strong>Fit Type:</strong> ${fit}</p>`;
      
      if (gender === "male") {
        html += `
          <p><strong>Shirt:</strong> ${rec.shirt}</p>
          <p><strong>Pants:</strong> ${rec.pant}</p>
          <p><strong>Shoes:</strong> ${rec.shoes}</p>
          <p><strong>Accessories:</strong> ${rec.accessories}</p>
          <div class="outfit-imgs">
            <img src="${getItemImage('shirt', rec.shirt)}" alt="${rec.shirt} shirt">
            <img src="${getItemImage('pant', rec.pant)}" alt="${rec.pant} pants">
            <img src="${getItemImage('shoes', rec.shoes)}" alt="${rec.shoes} shoes">
            <img src="${getItemImage('accessories', rec.accessories)}" alt="${rec.accessories}">
          </div>
        `;
      } else {
        let topItem = "";
        if (rec.dress) {
          topItem = `<p><strong>Dress:</strong> ${rec.dress}</p>
                    <div class="outfit-imgs">
                      <img src="${getItemImage('dress', rec.dress)}" alt="${rec.dress}">
                    </div>`;
        } else {
          // Determine which bottom item is present
          let bottomType = '';
          let bottomItem = '';
          
          if (rec.skirt) {
            bottomType = 'skirt';
            bottomItem = rec.skirt;
          } else if (rec.trousers) {
            bottomType = 'trousers';
            bottomItem = rec.trousers;
          } else if (rec.jeans) {
            bottomType = 'jeans';
            bottomItem = rec.jeans;
          }
          
          topItem = `<p><strong>Top:</strong> ${rec.top}</p>
                    <p><strong>Bottom:</strong> ${bottomItem}</p>
                    <div class="outfit-imgs">
                      <img src="${getItemImage('top', rec.top)}" alt="${rec.top}">
                      <img src="${getItemImage('bottom', bottomItem)}" alt="${bottomItem}">
                    </div>`;
        }
      
        html += `
          ${topItem}
          <p><strong>Shoes:</strong> ${rec.shoes}</p>
          <p><strong>Accessories:</strong> ${rec.accessories}</p>
          <div class="outfit-imgs">
            <img src="${getItemImage('shoes', rec.shoes)}" alt="${rec.shoes}">
            <img src="${getItemImage('accessories', rec.accessories)}" alt="${rec.accessories}">
          </div>
        `;
      }
      
      output.innerHTML = html;
      document.getElementById("saveBtn").style.display = "block";
    });
    
    // ----- SAVE OUTFIT as HTML -----
    document.getElementById("saveBtn").addEventListener("click", function () {
      const content = document.getElementById("output").innerHTML;
      const blob = new Blob([content], { type: "text/html" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = "outfit.html";
      a.click();
      URL.revokeObjectURL(url);
    });
  
    // For debugging - verify the script is running and forms are found
    console.log("Script loaded.");
    console.log("Login form found:", !!document.getElementById("loginForm"));
    console.log("Details form found:", !!document.getElementById("detailsForm"));
  });