// import node module libraries
import { Menu } from 'react-feather';
import {
	Nav,
	Navbar,
	Badge
} from 'react-bootstrap';

// import sub components
import QuickMenu from 'layouts/QuickMenu';

const NavbarTop = (props) => {
	return (
		<Navbar expanded="lg" className="navbar-classic navbar navbar-expand-lg">
			<div className='d-flex justify-content-between w-100'>
				<div className="d-flex align-items-center">
					<button
						type="button"
						id="nav-toggle"
						className="nav-icon me-2 icon-xs btn btn-link p-0 border-0"
						onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}>
						<Menu size="18px" />
					</button>
					<div className="ms-lg-3 d-none d-md-none d-lg-block">
						<Badge bg="light" text="dark" className="rounded-pill">A54-EBAA-11</Badge>
						<span className="text-muted ms-2 small">60 preguntas oficiales</span>
					</div>
				</div>
				{/* Quick Menu */}
				<Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap">
					<QuickMenu />
				</Nav>
			</div>
		</Navbar>
	);
};

export default NavbarTop;
