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
    <div className="flex justify-end  relative  top-5 p-0">
     <ToggleButtonGroup
      style={{ border:'1px solid white' , scale:'0.8', display:'flex', justifyContent:'flex-end' }}
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton style={{ color: 'white',borderRight:'1px solid white',padding:'10px' }} value="popular" color='primary'>Popular</ToggleButton>
      <ToggleButton style={{ color: 'white' ,padding:'10px' }} value="top_rated" color='primary'>Top rated</ToggleButton>
      <ToggleButton style={{ color: 'white',borderLeft:'1px solid white',padding:'10px'  }} value="upcoming" color='primary'>Up Coming</ToggleButton>
    </ToggleButtonGroup>
       
    </div>
  )
}

export default Moviefilter