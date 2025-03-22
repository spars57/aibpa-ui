import { lightenHexColor } from '@/theme/hex';
import { ButtonProps, CircularProgress, Button as MuiButton } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { memo } from 'react';

interface Props extends Omit<ButtonProps, 'color'> {
    loading?: boolean;
    color: keyof Theme['palette'];
}

const ButtonStyled = styled(MuiButton)<Props>(({ theme, variant, color = 'primary' }) => ({
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    height: '30px',
    paddingLeft: '25px',
    fontSize: '12px',
    fontFamily: 'Manrope-Light',
    fontWeight: 600,
    letterSpacing: 1.2,
    paddingRight: '25px',
    backgroundColor: variant === 'contained' ? theme.palette[color].main : 'transparent',
    border: `1px solid ${theme.palette[color].main}`,
    '&:hover': {
        backgroundColor: variant === 'contained' ? lightenHexColor(theme.palette[color].main, 25) : 'transparent',
    },
}));

const Button = (props: Props) => {
    const { loading, children, color, ...rest } = props;

    return (
        <ButtonStyled color={color as any} {...rest}>
            {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : children}
        </ButtonStyled>
    );
};

export default memo(Button);
