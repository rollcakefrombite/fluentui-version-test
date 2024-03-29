import * as React from 'react';
import {
  MenuButton,
  Menu,
  MenuPopover,
  MenuItemRadio,
  MenuList,
  MenuTrigger,
  makeStyles,
  MenuProps,
  MenuItem,
} from '../index';
import { version as packageJsonVersion } from '../../package.json';
import * as semver from 'semver';

const useStyles = makeStyles({
  menuButton: {
    minWidth: '210px',
    justifyContent: 'flex-start',
    marginLeft: '5px',
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  menuPopover: {
    minWidth: '210px',
    zIndex: 1000,
  },
  menuList: {
    overflowY: 'auto',
    maxHeight: '30vh',
  },
  menuItemRadio: {
    height: 'auto',
    paddingTop: '7px',
    paddingBottom: '7px',
  },
});

const onCheckedValueChange: MenuProps['onCheckedValueChange'] = (e, data) => {
  const selectedUrl = data.checkedItems[0] + (window.top || window).location.search;
  (window.top || window).location.href = selectedUrl;
};

/**
 * Theme picker used in the react-components docs header
 */
export const VersionSelector: React.FC = () => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [versions, setVersions] = React.useState<string[][]>([]);

  React.useEffect(() => {
    setIsLoading(true);

    // metadata.json is populated only in Chromatic
    // an example of the file is available here:
    // https://master--5ccbc373887ca40020446347.chromatic.com/metadata.json
    fetch('/metadata.json')
      .then(async response => {
        if (response.ok) {
          const versionsCleaned: string[][] = [];
          const tagUrlMap: { [key: string]: string } = (await response.json()).versions;

          Object.entries(tagUrlMap).forEach(([gitTag, url]) => {
            // The metadata.json contains mapping from git tags to published docs URLs.
            // Our git tags have the following format in v9: @fluentui/react-icons_v0.4.3
            //
            // We try to extract just the version number (e.g. 0.4.3), so only the number
            // would be visible in the version selector. As a fallback, we use the whole tag.

            const versionDirty = gitTag.split('_').pop() ?? '';
            const versionClean = semver.clean(versionDirty, true);
            versionsCleaned.push([versionClean ?? gitTag, url]);
          });

          const versionsSorted = versionsCleaned.sort(([a], [b]) => semver.compare(b, a));
          setVersions(versionsSorted);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Menu
      onCheckedValueChange={onCheckedValueChange}
      checkedValues={{
        version: versions.find(v => v[0] === `v${packageJsonVersion}`) || [],
      }}
    >
      <MenuTrigger>
        <MenuButton className={styles.menuButton} menuIcon={{ className: styles.chevronIcon }}>
          Version (v{packageJsonVersion})
        </MenuButton>
      </MenuTrigger>
      <MenuPopover className={styles.menuPopover}>
        <MenuList className={styles.menuList}>
          {isLoading && <MenuItem className={styles.menuItemRadio}>Loading...</MenuItem>}
          {!isLoading && versions.length === 0 && (
            <MenuItem className={styles.menuItemRadio}>Unable to load the list of available versions.</MenuItem>
          )}
          {versions.map(([version, url], index) => (
            <MenuItemRadio className={styles.menuItemRadio} name="version" value={url} key={index}>
              {version}
            </MenuItemRadio>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
