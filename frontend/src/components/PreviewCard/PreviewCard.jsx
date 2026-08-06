function PreviewCard({ preview, onDelete }) {

    return (

        <div className="preview-card">

            <div className="preview-image">

                <img
                    src={preview.preview_image}
                    alt="Website Preview"
                    onError={(e) => {
                        e.target.src =
                            "https://placehold.co/600x350/e5e7eb/6b7280?text=Preview+Not+Available";
                    }}
                />

            </div>

            <div className="preview-content">

                <h3>Website Preview</h3>

                <p>{preview.url}</p>

                <button
                    onClick={() => onDelete(preview.id)}
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default PreviewCard;