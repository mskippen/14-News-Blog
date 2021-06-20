const deletePostBtn = document.querySelectorAll(".deletePost")

deletePostBtn.forEach(i => {
    i.addEventListener("click", (e) => {
        const id = e.target.id
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
})