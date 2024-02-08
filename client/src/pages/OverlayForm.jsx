import { useState } from 'react';
import axios from 'axios';

const OverlayForm = () => {
    const [position, setPosition] = useState('');
    const [size, setSize] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/overlay', { position, size, content });
            setPosition('');
            setSize('');
            setContent('');
            setLoading(false);
            alert('Overlay created successfully');
        } catch (error) {
            console.error('Error creating overlay:', error);
            setError('Failed to create overlay');
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md flex flex-col justify-center items-center h-screen">
    <h2 className="text-2xl font-semibold mb-4">Add Overlay</h2>
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex flex-col mb-4">
            <label htmlFor="position" className="text-lg mb-1">Position:</label>
            <input 
                type="text" 
                id="position" 
                value={position} 
                onChange={(e) => setPosition(e.target.value)} 
                placeholder="e.g., top-left" 
                className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="flex flex-col mb-4">
            <label htmlFor="size" className="text-lg mb-1">Size:</label>
            <input 
                type="text" 
                id="size" 
                value={size} 
                onChange={(e) => setSize(e.target.value)} 
                placeholder="e.g., 100px x 50px" 
                className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="flex flex-col mb-4">
            <label htmlFor="content" className="text-lg mb-1">Content:</label>
            <input 
                type="text" 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Content to overlay" 
                className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button 
            type="submit" 
            className={`bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            disabled={loading}
        >
            {loading ? 'Adding Overlay...' : 'Add Overlay'}
        </button>
    </form>
</div>

    );
}

export default OverlayForm;
