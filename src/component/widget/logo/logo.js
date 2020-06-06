import React from 'react';


export const Logo = ({compact, spanOnly, black, loading})=>{
    const styles = {
        box: {
            height: ' 30px' ,
            width: ' 30px ' ,
            background: `${ black ? '#aaa' : 'var(--primary-color)' } `,
            textAlign: 'center',
            boxSizing: ' border-box ',
            padding: ' 1px 0px 0px 2px ', 
            color: `${ black ? '#eee' : 'white' } `,
            borderRadius: '3px'
        },
        span: {
            paddingLeft: ' 2px ',
            color: `${ black ? '#555' :  spanOnly ? 'var(--secondary-color)' : 'white' } `,

        }
    }
    return(
        <>
            {
                compact ?
                <div className="full-width padded-10 grid centered align-c logo">
                    <h2  style={styles.box} className="no-margin">P</h2>
                </div>
                :
                <div className="full-width padded-10 grid centered align-c logo">
                    <h2  style={styles.box} className="no-margin">P</h2>
                    {
                        loading ? 
                        <span style={styles.span} className="no-margin">Loading</span>
                        :
                        <span style={styles.span} className="no-margin">ixare</span>
                    }
                </div>
            }
        </>
    )
}


export default Logo