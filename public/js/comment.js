const form = document.querySelector("form.commentForm")
const deleteCommentBtn = document.querySelectorAll(".deleteComment")

function handleUpdate (event) {
    event.preventDefault()

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const text = form.text.value
    
    fetch(`/api/comments/`, {
        method: "POST",
        body: JSON.stringify({
            text,
            post_id: id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if(response.ok) {
            document.location.reload()
        } else {
            alert("Bad request could not post comment")
        }
    })
}

function deleteComment () {
    console.log("you jsut clicked me")
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    fetch(`/api/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if(response.ok) {
            document.location.reload()
        } else {
            alert("Bad request could not delete comment")
        }
    })
}

form.addEventListener("submit", handleUpdate)
// deleteCommentBtn.forEach(i => {
//     i.addEventListener("click", () => deleteComment())
// })
console.log(deleteCommentBtn)
