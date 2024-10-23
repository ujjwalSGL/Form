import Label from './Label'
import Input from './Input'
import Error from './Error'


function Data({ isRequired, type, name, value, onChange, className, children, placeholder,error }) {

    return (
        <div>
            
            <Label
                isRequired={isRequired}
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