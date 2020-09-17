import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'grid',
			placeItems: 'center',
			padding: theme.spacing(2),
		},
		loginBox: {
			width: '100%',
			maxWidth: 500,
			'& > *': {
				marginBottom: theme.spacing(2),
			},
			[theme.breakpoints.up('sm')]: {
				marginTop: -100,
			},
		},
	})
);
