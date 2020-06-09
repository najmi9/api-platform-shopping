<?php

namespace App\Events;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Entity\Cart;
use Symfony\Component\Security\Core\Security;

class CartUserSubscriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForCart', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForCart(ViewEvent $event)
    {
        $cart = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($cart instanceof Cart && $method === "POST") {
            // Choper l'utilisateur actuellement connecté
            $user = $this->security->getUser();
            // Assigner l'utilisateur au Customer qu'on est en train de créer
            if ($user) {
                $cart->setUser($user)
                     ->setCreatedAt(new \DateTime())
                     ->setPaid(0)
                ;
            }
        }
    }
}
