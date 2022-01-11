import { Center, Heading, InputLeftAddon, Stack } from '@chakra-ui/react'
import { Input, InputGroup, Button, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { disconnect, initWAMP } from 'services/wamp'



export default function App() {
    const [address, setAddress] = useState('')
    const [realm, setRealm] = useState('')
    const [isConnecting, setIsConnecting] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const toast = useToast()

    const onConnect = () => {
        if(isConnected){
            disconnect()
            setIsConnected(false);
            return
        }

        if(address.length === 0){
            toast({
                title: 'Enter valid address',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if(realm.length === 0){
            toast({
                title: 'Enter valid realm',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        setIsConnecting(true)
        
        initWAMP(address, realm, (success) => {
            toast({
                title: success 
                    ? 'Connection established' 
                    : 'An error has occured',
                description: success ? `Successfuly connected to ${address} using realm ${realm}` : undefined,
                status: success ? 'success' : 'error',
                duration: 9000,
                isClosable: true,
            })
            setIsConnecting(false)
            if(success){
                setIsConnected(true)
            }
        })
    }

    return (
        <Center h='100%'>
            <Center h='160px' w='600px' gap='12px' flexDirection={'column'}>
                <Heading size='md'>WAMP CLIENT TEST</Heading>
                <InputGroup>
                    <Input disabled={isConnecting || isConnected} value={address} type='text' placeholder='address:port' onChange={(event) => setAddress(event.target.value)}/>
                </InputGroup>
                <InputGroup>
                    <Input disabled={isConnecting || isConnected} value={realm} placeholder='realm' onChange={(event) => setRealm(event.target.value)}/>
                </InputGroup>
                <Stack direction='row' spacing={4}>
                   <Button
                    isLoading={isConnecting}
                    loadingText={isConnected ? 'Disconnecting' : 'Connecting'}
                    colorScheme={isConnected ? 'red' : 'teal'}
                    variant='outline'
                    onClick={onConnect}
                >
                    {isConnected ? 'Disconnect' : 'Connect'}
                </Button> 
                </Stack>
            </Center>
        </Center>
    )
}

