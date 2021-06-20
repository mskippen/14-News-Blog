const deleteBtn = document.querySelector(".editPost button.delete")

const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
deleteBtn.addEventListener("click", () => {
    console.log("clicked")

      fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if(response.ok) {
            document.location.replace("/dashboard")
        } else {
            alert("Bad request could not update post data")
        }
    })
})