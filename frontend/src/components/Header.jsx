const Header = ({ onCreate }) => {
    const handleCreateClick = () => {
        if (onCreate) {
            onCreate();
        }
    }
    return (
        <div className="header">
            <div className="title">Incident Tracker</div>
            <button
              className="create-btn"
              onClick={onCreate}
            >
                + Create Incident
            </button>
        </div>
    )
}

export default Header;
