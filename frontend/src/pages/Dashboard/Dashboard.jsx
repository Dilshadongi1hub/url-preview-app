import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import URLForm from "../../components/URLForm/URLForm";
import PreviewCard from "../../components/PreviewCard/PreviewCard";

import {
    savePreview,
    getAllPreviews,
    deletePreview
} from "../../services/previewService";

function Dashboard() {

    const navigate = useNavigate();

    const [previews, setPreviews] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/");
            return;

        }

        loadPreviews();

    }, []);

    const loadPreviews = async () => {

        try {

            const response = await getAllPreviews();

            setPreviews(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleSave = async (url) => {

        try {

            await savePreview({
                url
            });

            loadPreviews();

        } catch (error) {

            alert("Unable to generate preview");

        }

    };

    const handleDelete = async (id) => {

        try {

            await deletePreview(id);

            loadPreviews();

        } catch (error) {

            alert("Unable to delete preview");

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        navigate("/");

    };

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <h1>

                URL Preview Application

            </h1>

            <p className="subtitle">

                Generate Website Preview Instantly

            </p>

            <URLForm
                onSubmit={handleSave}
            />

            <div className="preview-list">

                {

                    previews.length > 0 ?

                        previews.map((preview) => (

                            <PreviewCard
                                key={preview.id}
                                preview={preview}
                                onDelete={handleDelete}
                            />

                        ))

                        :

                        <div className="empty-state">

                            No previews available.

                        </div>

                }

            </div>

        </div>

    );

}

export default Dashboard;