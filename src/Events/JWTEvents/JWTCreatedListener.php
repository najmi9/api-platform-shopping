<?php

namespace App\Events\JWTEvents;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Security;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;

/**
 * 
 */
class JWTCreatedListener 
{

/**
 * @var RequestStack
 */
private $requestStack;
private  $security;

/**
 * @param RequestStack $requestStack
 */
public function __construct(RequestStack $requestStack, Security $security)
{
    $this->requestStack = $requestStack;
    $this->security = $security;
}

/**
 * @param JWTCreatedEvent $event
 *
 * @return void
 */
public function onJWTCreated(JWTCreatedEvent $event)
{
    $request = $this->requestStack->getCurrentRequest();
    $payload       = $event->getData();
    $payload['ip'] = $request->getClientIp();

    $payload['userId'] = $event->getUser()->getId();
   
    
    $event->setData($payload);
     
}
}