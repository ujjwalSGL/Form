import Label from './Label'
import Input from './Input'
import Error from './Error'


function Data({ isRequired, type, name, value, onChange, className, children, placeholder, error, somelabel }) {

    return (
        <div>
            
            <Label
                isRequired={isRequired}
                somelabel={somelabel}
            >{children}</Label>
            <Input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={className}
                placeholder={placeholder}

            />
            <Error errors={error} />
        </div>
    )
}

export default Data