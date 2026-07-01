import Link from 'next/link';
import { useRouter } from 'next/router';
import { ListGroup } from 'react-bootstrap';
import { useAuth } from 'components/auth/AuthProvider';

const quickLinks = [
  { href: '/practice', icon: 'book-open', label: 'Practice' },
  { href: '/exam', icon: 'clock', label: 'Mock exam' },
  { href: '/review', icon: 'check-square', label: 'Review' }
];

const QuickMenu = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/authentication/sign-in');
  };

  return (
    <ListGroup as="ul" bsPrefix="navbar-nav" className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
      {quickLinks.map((item) => (
        <li className="ms-2" key={item.href}>
          <Link href={item.href} className="btn btn-light btn-icon rounded-circle text-muted" title={item.label}>
            <i className={`fe fe-${item.icon}`}></i>
          </Link>
        </li>
      ))}
      <li className="ms-2">
        <button
          type="button"
          className="btn btn-light btn-icon rounded-circle text-muted"
          title="Sign out"
          aria-label="Sign out"
          onClick={handleSignOut}
        >
          <i className="fe fe-log-out"></i>
        </button>
      </li>
    </ListGroup>
  );
};

export default QuickMenu;
