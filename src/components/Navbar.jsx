import React, { useEffect, useState } from 'react';
import style from '../css/Navbar.module.css';
import { FiSearch, FiHeart, FiUser, FiMenu, FiX, FiChevronRight } from 'react-icons/fi';
import { FaFilm, FaHome, FaTv } from 'react-icons/fa';
import logo from '../assets/images/movie-logo.png';
import { Link } from 'react-router-dom';
import { getSearchDetails } from '../services/Api';
import { languageMap } from '../configurations/Language';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    {
      icon: <FaHome />,
      label: 'Home',
      href: '/'
    },
    {
      icon: <FaFilm />,
      label: 'Movies',
      href: '#',
      submenu: [
        { label: 'Popular', href: '/movies/popular' },
        { label: 'Now Playing', href: '/movies/playing' },
        { label: 'Upcoming', href: '/movies/upcoming' },
        { label: 'Top Rated', href: '/movies/top-rated' },
      ]
    },
    {
      icon: <FaTv />,
      label: 'TV Shows',
      href: '#',
      submenu: [
        { label: 'Popular', href: '/series/popular' },
        { label: 'Airing Today', href: '/series/today-airing' },
        { label: 'On TV', href: '/series/on-the-air' },
        { label: 'Top Rated', href: '/series/top-rated' }
      ]
    },
  ];

  useEffect(() => {
    const searchFun = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      try {
        const data = await getSearchDetails(searchQuery);
        setSearchResults(data.results || []);
        setShowResults(true);
      } catch (err) {
        console.log(err);
        setSearchResults([]);
      }
    };

    // Add debounce to avoid too many API calls
    const timeoutId = setTimeout(searchFun, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => setShowResults(false), 200);
  };

  const handleResultClick = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <nav className={style.navbar}>
      {/* Logo and Mobile Menu Button */}
      <div className={style.logoBlock}>
        <img src={logo} alt='logo' className={style.logo} />
        <button className={style.menuButton} onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Navigation Options */}
      <div className={`${style.navContent} ${isMenuOpen ? style.show : ''}`}>
        {/* Main Menu Trigger */}
        <div
          className={style.menuTrigger}
          onMouseEnter={() => setActiveMenu('main')}
          onMouseLeave={() => {
            setActiveMenu(null);
            setActiveSubmenu(null);
          }}
        >
          <span>Menu</span>

          {/* Main Dropdown Menu */}
          {activeMenu === 'main' && (
            <div
              className={style.mainDropdown}
              onMouseEnter={() => setActiveMenu('main')}
              onMouseLeave={() => {
                setActiveMenu(null);
                setActiveSubmenu(null);
              }}
            >
              <div className={style.menuContainer}>
                <ul className={style.mainMenu}>
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      onMouseEnter={() => {
                        if (item.submenu) {
                          setActiveSubmenu(index);
                        } else {
                          setActiveSubmenu(null);
                        }
                      }}
                      className={activeSubmenu === index ? style.activeMenuItem : ''}
                    >
                      <Link to={item.href} className={style.menuLink}>
                        <span className={style.menuIcon}>{item.icon}</span>
                        {item.label}
                        {item.submenu && <FiChevronRight className={style.chevron} />}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Submenu Panel */}
                {activeSubmenu !== null && menuItems[activeSubmenu]?.submenu && (
                  <div className={style.submenuPanel}>
                    <h4 className={style.submenuTitle}>{menuItems[activeSubmenu].label}</h4>
                    <ul className={style.submenu}>
                      {menuItems[activeSubmenu].submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subItem.href} className={style.submenuLink}>
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className={style.searchBlock}>
          <div className={style.searchContainer}>
            <FiSearch className={style.searchIcon} />
            <input
              type='search'
              name='search'
              placeholder='Search movies, TV shows, actors...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 0 && setShowResults(true)}
              onBlur={handleSearchBlur}
              className={style.searchInput}
            />

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className={style.searchResults}>
                <div className={style.resultsHeader}>
                  <h4>Search Results</h4>
                  <button
                    className={style.closeResults}
                    onClick={() => setShowResults(false)}
                  >
                    <FiX />
                  </button>
                </div>
                <div className={style.resultsList}>
                  {searchResults.slice(0, 10).map((result) => (
                    <Link
                      key={result.id}
                      to={
                        result.media_type === 'tv'
                          ? `/series/${result.id}`
                          : result.media_type === 'person'
                          ? `/person/${result.id}`
                          : `/spotlight/${result.id}`
                      }
                      className={style.resultItem}
                      onClick={handleResultClick}
                    >
                      <div className={style.resultImage}>
                        {result.poster_path || result.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92/${
                              result.poster_path || result.profile_path
                            }`}
                            alt={result.title || result.name}
                          />
                        ) : (
                          <div className={style.placeholderImage}></div>
                        )}
                      </div>
                      <div className={style.resultInfo}>
                        <h4>
                          {result.title || result.name}{' '}
                          {result.original_language && result.media_type !== 'person'
                            ? `(${languageMap[result.original_language]})`
                            : ''}
                        </h4>
                        <p>
                          {result.media_type === 'movie'
                            ? `Movie • ${result.release_date ? new Date(result.release_date).getFullYear() : 'N/A'}`
                            : result.media_type === 'tv'
                            ? `TV Show • ${result.first_air_date ? new Date(result.first_air_date).getFullYear() : 'N/A'}`
                            : 'Actor / Person'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={style.actionBlock}>
          <button className={style.iconButton}>
            <FiHeart className={style.icon} />
            <span className={style.buttonText}>Favorites</span>
          </button>
          <button className={style.textButton}>Login</button>
          <button className={`${style.textButton} ${style.primaryButton}`}>Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
