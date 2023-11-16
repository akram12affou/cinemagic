import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
function Moviefilter({setAlignment ,alignment }) {
     
    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };
  return (
    <div className='flex justify-center'>
        <div className="flex justify-end  sm:w-10/12 w-11/12 mr-0	 relative  top-5 ">
     <ToggleButtonGroup
     className='scale-75 sm:scale-90'
      style={{ border:'2px solid white' , display:'flex', justifyContent:'flex-end' }}
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton style={{ color: 'white',borderRight:'2px solid white',padding:'10px',fontSize:'13px',fontWeight:'bold' }} value="popular" color='primary'>Popular</ToggleButton>
      <ToggleButton style={{ color: 'white' ,padding:'10px' ,fontSize:'13px',fontWeight:'bold'}} value="top_rated" color='primary'>Top rated</ToggleButton>
      <ToggleButton style={{ color: 'white',borderLeft:'2px solid white',padding:'10px',fontSize:'13px',fontWeight:'bold'  }} value="upcoming" color='primary'>Up Coming</ToggleButton>
    </ToggleButtonGroup>
       
    </div>
    </div>
  
  )
}

export default Moviefilter