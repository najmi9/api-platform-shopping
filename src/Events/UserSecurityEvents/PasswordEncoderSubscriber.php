<?php

namespace App\Events\UserSecurityEvents;

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

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
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
        $routeName = $event->getRequest()->attributes->get('_route');
        if ($method === "POST" && $routeName ==="api_users_POST_collection")
       {
            $code = mt_rand(100000, 999999);
            $hash = $this->encoder->encodePassword($user, $user->getPassword());
            $user->setPassword($hash)
                 ->setActivationCode($code)
            ;
        }
    }
}
