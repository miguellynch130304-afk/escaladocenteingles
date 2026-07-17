// import node module libraries
import { Menu } from 'react-feather';
import {
	Nav,
	Navbar,
	Badge
} from 'react-bootstrap';

// import sub components
import QuickMenu from 'layouts/QuickMenu';
import { useAuth } from 'components/auth/AuthProvider';
import { FREE_MOCK_QUESTION_COUNT, FULL_MOCK_QUESTION_COUNT } from 'data/accessPlans';

const NavbarTop = (props) => {
	const { accessLoading, isPremium, user } = useAuth();
	const isCheckingAccess = Boolean(user && accessLoading);
	const questionCount = isPremium ? FULL_MOCK_QUESTION_COUNT : FREE_MOCK_QUESTION_COUNT;

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
						<Badge
							bg={isPremium ? 'warning' : 'light'}
							text="dark"
							className="rounded-pill"
						>
							{isCheckingAccess ? 'Checking access...' : isPremium ? 'Premium' : (user ? 'Free account' : 'Free demo')}
						</Badge>
						<span className="text-muted ms-2 small">
							{isCheckingAccess ? 'Validating your plan' : `${questionCount} Mock Exam questions`}
						</span>
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
