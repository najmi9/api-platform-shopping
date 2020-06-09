<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Security;

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
    $user = $this->security->getUser();
   // dd($user, $event);
    $payload       = $event->getData();
    $payload['ip'] = $request->getClientIp();
    $payload['userId'] = $user->getId();

    $event->setData($payload);
}
}