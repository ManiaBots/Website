import Router from 'next/router';

import styles from './Navigation.module.scss';

export default function NavItem(props) {
    return (
        <div className={styles.navItem}>
            <a href={props.href} className={props.right ? styles.navItemRight : styles.navItemLeft} onClick={handleRoute}>{props.name}</a>
            {props.dropdown && (<div className={styles.navItemDropdown}>
                {
                    props.dropdown.map(x => (
                        <>
                            <a href={x.href} className={styles.dropdownItem}><i className={x.icon} /> {x.name}</a><br/>
                        </>
                    ))
                }
            </div>)}
        </div>
    )
}

function handleRoute(e) {
    e.preventDefault();
    Router.push(e.target.href, undefined, { shallow: true })
}