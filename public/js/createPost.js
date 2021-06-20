const form = document.querySelector("section.createPost form")

function handleSubmit (event) {
    event.preventDefault()

    const title = form.title.value
    const post_body = form.post_body.value
    
    fetch("/api/posts", {
        method: "POST",
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
            alert("Bad request could not post data")
        }
    })
}

form.addEventListener("submit", handleSubmit)
