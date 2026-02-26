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
  Avatar,
  Typography,
  Box,
  Divider
} from "../assets/mui";


export default function IconMenu({ user }) {
  return (
    <Paper className="app-block menu-block" sx={{ width: 320, maxWidth: '100%' , borderRadius: 3}}>
      
    <Box
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#C45A3B",
          width: 48,
          height: 48,
          fontSize: 20,
        }}
      >
        {user?.name?.[0] ?? "U"}
      </Avatar>

      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {user?.name ?? "User"}
        </Typography>
      </Box>
    </Box>

<Divider />
      
      
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

        <ListItemText
          primary="Profil"
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
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText
          primary="Famille"
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
            <EmailIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText
          primary="Messagerie"
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
            <CelebrationIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText
          primary="Evènements"
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
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText
          primary="Paramètres"
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

      </MenuList>
    </Paper>
  );
}
