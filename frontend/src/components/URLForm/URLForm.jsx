import { useState } from "react";

function URLForm({ onSubmit }) {

    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!url.trim()) {
            alert("Please enter a URL");
            return;
        }

        onSubmit(url);

        setUrl("");

    };

    return (

        <form onSubmit={handleSubmit} className="url-form">

            <input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <button type="submit">
                Generate Preview
            </button>

        </form>

    );

}

export default URLForm;