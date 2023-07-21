import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBed,
	faPlane,
	faCab,
	faTaxi,
	faCalendarDays,
	faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { DateRange } from 'react-date-range';

const Header = ({type}) => {

	// state for destination - option

	const [destination, setDestination] = useState ("");

	const [openDate, setOpenDate] = useState(false);

	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		},
	]);

	// state for options

	
	const [openOptions, setOpenOptions] = useState (false);

	const [options, setOptions] = useState({
		adult:1,
		children:0,
		room:1,
	})

    const navigate =  useNavigate()

	// increment and decrement options


	const handleOption =(name, operation) =>{
		setOptions(prev=> {return {
			...prev, [name]: operation === "i" ? options[name] +1 : options[name] -1
			
		} })
	}

	// set state to show the options 

	const [showOptions, setShowOptions] = useState(false);

	// to load the selected options in search screen

	const  handleSearch = ()=>{
          navigate('/hotels', {state:{destination, date, options}})
	}

	return (
		<div className='header'>
			<div className= {type==="list" ? 'headerContainer listMode' : 'headerContainer' } >
				<div className='headerList'>
					<div className='headerListItem active'>
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faPlane} />
						<span>Flights</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faCab} />
						<span>Car rentals</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faBed} />
						<span>Attraction</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faTaxi} />
						<span>Airport Taxis</span>
					</div>
				</div>

				{/* Header descriptions     */}
				{ type!== "list" &&
					
					<><h1 className='headerTitle'>Find your next stay</h1>
				<p className='headerDesc'>
					Search low prices on hotels, homes and much more...
				</p>

				<button className='headerBtn'>Sign in / Register</button>

				{/* Header search contents  */}

				<div className='headerSearch'>
					<div className='headerSearchItem'>
						<FontAwesomeIcon icon={faBed} className='headerIcon' />
						<input
							type='text'
							placeholder='Where are you going?'
							className='headerSearchInput'
							onChange={e=> setDestination(e.target.value)}
						/>
					</div>
					<div className='headerSearchItem'>
						<FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
						<span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, "MM/dd/yyyy" )} to ${format(date[0].endDate, "MM/dd/yyyy" )}`}</span>

						{openDate && <DateRange
							editableDateInputs={true}
							onChange={(item) => setDate([item.selection])}
							moveRangeOnFirstSelection={false}
							ranges={date} className="date" minDate={new Date()}
						/>}
					</div>
					<div className='headerSearchItem'>
						<FontAwesomeIcon icon={faPerson} className='headerIcon' />
						<span onClick={()=>setShowOptions(!showOptions)} className='headerSearchText'>
						{`${options.adult} adult. ${options.children} Children. ${options.room} room `}
							
						</span>
{/* options setting div  */}
						{showOptions && <div  className="options">
							<div className="optionItem">
								<span className="optionText">Adult</span>
								<div className="optionCounter">
								<button disabled={options.adult<=1} className="optionCounterButton" onClick={()=> handleOption("adult", "d")}>-</button>
								<span className="optionCounterNumber">{options.adult}</span>
								<button className="optionCounterButton" onClick={()=> handleOption("adult", "i")}>+</button>
								</div>
								
							</div>
							<div className="optionItem">
								<span className="optionText">Children</span>
								<div className="optionCounter">
								<button disabled={options.children<=0} className="optionCounterButton" onClick={()=> handleOption("children", "d")}>-</button>
								<span className="optionCounterNumber">{options.children}</span>
								<button className="optionCounterButton" onClick={()=> handleOption("children", "i")}>+</button>

								</div>
								
							</div>
							<div className="optionItem">
								<span className="optionText">Rooms</span>
								<div className="optionCounter">
								<button disabled={options.room<=1} className="optionCounterButton" onClick={()=> handleOption("room", "d")}>-</button>
								<span className="optionCounterNumber">{options.room}</span>
								<button className="optionCounterButton" onClick={()=> handleOption("room", "i")}>+</button>
								</div>
								
							</div>
						</div> }
					</div>
					<div className='headerSearchItem'>
						<button className='searchBtn' onClick={handleSearch}>Search</button>
					</div>
				</div> </>}
			</div>
		</div>
	);
};

export default Header;
