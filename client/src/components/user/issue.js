import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import Cookies library if not already imported
import VoluntierNavbar from "./navbarvoluntier";

const IssueForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token');
                const res = await axios.post('/auth/fetchvoluntier', { token });
                const userData = res.data.user;
                setUserName(userData.name); // Set the user's name
            } catch (error) {
                console.error('fetch data error', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/auth/createissue', { title, description, location, category, userName });
            alert("Issue submitted successfully");
            setTitle('');
            setDescription('');
            setLocation('');
            setCategory('');
        } catch (err) {
            console.error("Issue creating error", err);
            setError('Failed to create issue');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <VoluntierNavbar />
            <div style={styles.container}>
                <h1 style={styles.heading}>Issue Form</h1>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ ...styles.input, marginBottom: '20px' }} />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ ...styles.input, height: '100px', resize: 'vertical' }} />
                    <select value={location} onChange={(e) => setLocation(e.target.value)} required style={styles.input}>
                        <option value="">Select Location</option>
                        <option value="1 st street">1 st street</option>
                        <option value="middle street">middle street</option>
                        <option value="east street">east street</option>
                        <option value="kannathasan street">kannathasan street</option>
                        {/* Add more locations as needed */}
                    </select>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required style={styles.input}>
                        <option value="">Select Category</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Environment">Environment</option>
                        <option value="Community">Community</option>
                        <option value="Other">Other</option>
                        {/* Add more categories as needed */}
                    </select>
                    <button type="submit" disabled={loading} style={styles.button}>Submit</button>
                </form>
            </div>
        </>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px'
    },
    heading: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        marginBottom: '20px'
    },
    error: {
        color: 'red',
        marginBottom: '10px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    input: {
        width: '300px',
        marginBottom: '20px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px'
    },
    button: {
        width: '150px',
        height: '40px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default IssueForm;
