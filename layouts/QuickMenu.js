import Link from 'next/link';
import { ListGroup } from 'react-bootstrap';

const quickLinks = [
  { href: '/practice', icon: 'book-open', label: 'Practice' },
  { href: '/exam', icon: 'clock', label: 'Mock exam' },
  { href: '/review', icon: 'check-square', label: 'Review' }
];

const QuickMenu = () => {
  return (
    <ListGroup as="ul" bsPrefix="navbar-nav" className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
      {quickLinks.map((item) => (
        <li className="ms-2" key={item.href}>
          <Link href={item.href} className="btn btn-light btn-icon rounded-circle text-muted" title={item.label}>
            <i className={`fe fe-${item.icon}`}></i>
          </Link>
        </li>
      ))}
    </ListGroup>
  );
};

export default QuickMenu;
