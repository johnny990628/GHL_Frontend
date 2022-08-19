const Header = () => {
    const style = {
        textAlign: 'center',
        paddingTop: '1px',
        height: `${window.innerHeight / 3}px`,
        padding: 1,
        boxShadow: '1px 1px 1x ',
        backgroundImage: `url(${'/bg.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    }

    return (
        <div style={style}>
            <img
                src="./GHL_logo.png"
                alt="logo"
                style={{
                    height: `${window.innerHeight / 5}px`,
                    paddingTop: '20px',
                }}
            />
            <p
                style={{
                    fontSize: '24px',
                    color: '#ffffff',
                    marginTop: '-0px',
                }}
            >
                好心肝診所　健康檢查表單
            </p>
        </div>
    )
}
export default Header
