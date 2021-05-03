// needs to be after the page loads or the input button doesn't exist yet.
window.onload = function () {
  const chooseFileButton = document.getElementById("choosefilebutton");
  chooseFileButton.addEventListener("change", updateImageDisplay);
  let juxtaposeLogo = document.getElementsByClassName("jx-knightlab")[0];
  juxtaposeLogo.classList.add("is-hidden");
}


async function updateImageDisplay() {
  document.getElementById("takenImage").classList.remove("is-hidden");
  document.getElementById("shareButton").classList.add("is-hidden");
  document.getElementById("downloadButton").classList.add("is-hidden");

  // upload and show the image
  let input = document.getElementById("choosefilebutton");
  let imagefile = input.files[0];


  // turn upload file into base64
  let reader = new FileReader();
  reader.readAsDataURL(imagefile);
  reader.onloadend = function () {
    let base64data = reader.result;
    document.getElementById("choose-file-button-label").classList.add("is-loading");
    document.getElementById("juxtapose-wrapper").classList.add("is-hidden");
    // document.getElementById("mainImage").src = base64data;
    document.getElementById("takenImage").src = base64data;
    // run the AI exciting :)
    deepai.setApiKey('a8c40b67-9573-41d9-91f7-468eae5807fc');
    (async function () {
      var resp = await deepai.callStandardApi("colorizer", {
        image: document.getElementById("choosefilebutton"),
      });

      let juxtaposeWrapper = document.getElementById("juxtapose-wrapper");
      juxtaposeWrapper.getElementsByTagName("IMG")[0].src = resp["output_url"];
      juxtaposeWrapper.getElementsByTagName("IMG")[1].src = resp["output_url"];
      juxtaposeWrapper.getElementsByTagName("IMG")[1].style.filter = "grayscale(100%)";


      juxtaposeWrapper.getElementsByTagName("IMG")[1].onload = function () {
        let falseSlider0 = document.getElementsByClassName("jx-slider vertical")[0];
        falseSlider0.remove();
        document.getElementById("juxtapose-wrapper").classList.remove("is-hidden");
        document.getElementById("takenImage").classList.add("is-hidden");
        document.getElementById("shareButton").classList.remove("is-hidden");
        document.getElementById("downloadButton").classList.remove("is-hidden");
        document.getElementById("choose-file-button-label").classList.remove("is-loading");
      }

      let juxtaposeLogo = document.getElementsByClassName("jx-knightlab")[0];
      juxtaposeLogo.classList.add("is-hidden");

      // download
      const base64url = await juxtaposeWrapper.getElementsByTagName("IMG")[0].src;
      const blob = await (await fetch(base64url)).blob();
      const blobUrl = URL.createObjectURL(blob);
      document.getElementById("downloadButton").href = blobUrl;
    })()
  }
}

// share
async function share() {
  let juxtaposeWrapper = document.getElementById("juxtapose-wrapper");
  const base64url = juxtaposeWrapper.getElementsByTagName("IMG")[0].src;
  const blob = await (await fetch(base64url)).blob();
  const file = new File([blob], 'memories_in_color_image.jpeg', { type: blob.type });

  const shareData = {
    title: 'Memories in Color',
    text: 'Bring your old memories to color!',
    url: 'https://memoriesincolor.com',
    files: [file],
  }
  navigator.share(shareData);
}


document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});