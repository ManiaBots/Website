import styles from './Navigation.module.scss';
import NavItem from './NavItem';
import Profile from './Profile';

export default function Navigation() {
    return (
        <div className={styles.navigation}>
            <NavItem
                name="test"
                href="/test"
                dropdown={[
                    {
                        name: "Test",
                        href: "/test",
                        icon: "fab fa-discord"
                    }
                ]}
            />
            <NavItem
                name="test"
                href="/test"
            />
            <NavItem
                name="test"
                href="/test"
            />

            <Profile />
        </div>
    )
}