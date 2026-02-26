import * as React from 'react';

import {
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  ArrowForwardIos, 
  HomeIcon,
  FavoriteIcon,
  AccountBoxIcon,
  EmailIcon,
  CelebrationIcon,
  SettingsIcon,
} from "../assets/mui";


export default function IconMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
      <MenuItem sx={{ py: 2 }}>
        <ListItemIcon>
          <HomeIcon fontSize="small" />
        </ListItemIcon>

        <ListItemText
          primary="Accueil"
          slotProps={{
            primary: {
              sx: { textAlign: "left" }
            }
          }}
        />

        <ArrowForwardIos
          sx={{
            marginLeft: "auto",
            fontSize: 16,
            color: "text.secondary",
          }}
        />
      </MenuItem>        
      <MenuItem sx={{ py: 2 }}>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profil</ListItemText>
            <ArrowForwardIos
            sx={{
                marginLeft: "auto",
                fontSize: 16,
                color: "text.secondary",
            }}
            />        
        </MenuItem>
        <MenuItem sx={{ py: 2 }}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Famille</ListItemText>
            <ArrowForwardIos
            sx={{
                marginLeft: "auto",
                fontSize: 16,
                color: "text.secondary",
            }}
            />        
        </MenuItem>
        <MenuItem sx={{ py: 2 }}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Messagerie</ListItemText>
            <ArrowForwardIos
            sx={{
                marginLeft: "auto",
                fontSize: 16,
                color: "text.secondary",
            }}
            />        
        </MenuItem>
        <MenuItem sx={{ py: 2 }}>
          <ListItemIcon>
            <CelebrationIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Evènements</ListItemText>
            <ArrowForwardIos
            sx={{
                marginLeft: "auto",
                fontSize: 16,
                color: "text.secondary",
            }}
            />        
        </MenuItem>
        <MenuItem sx={{ py: 2 }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paramètres</ListItemText>
            <ArrowForwardIos
            sx={{
                marginLeft: "auto",
                fontSize: 16,
                color: "text.secondary",
            }}
            />        
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
