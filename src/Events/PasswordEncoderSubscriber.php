<?php

namespace App\Events;

use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoderSubscriber implements EventSubscriberInterface
{

    /** @var UserPasswordEncoderInterface */
    private $encoder, $tokenGenerator;

    public function __construct(UserPasswordEncoderInterface $encoder,
    TokenGeneratorInterface $tokenGenerator )
    {
        $this->encoder = $encoder;
        $this->tokenGenerator = $tokenGenerator;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
        ];
    }

    public function encodePassword(ViewEvent $event)
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); // POST, GET, PUT, ...

        if ($user instanceof User && $method === "POST") {
            $code = mt_rand(100000, 999999);
            $token = $this->tokenGenerator->generateToken();
            $hash = $this->encoder->encodePassword($user, $user->getPassword());
            $user->setPassword($hash)
                 ->setActivationToken($token)
                 ->setActivationCode($code)
            ;
        }
    }
}
