const form = document.querySelector("section.editPost form")

function handleUpdate (event) {
    event.preventDefault()

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];

    const title = form.title.value
    const post_body = form.post_body.value
    
    fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            post_body
        }),
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
}

form.addEventListener("submit", handleUpdate)
