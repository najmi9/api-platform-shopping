<?php

namespace App\Events;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Entity\CancledOrder;
use Symfony\Component\Security\Core\Security;

class CancledOrderSubscriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForOrder', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForOrder(ViewEvent $event)
    {
        $comment = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($comment instanceof CancledOrder && $method === "POST") {
            // Choper l'utilisateur actuellement connecté
            $user = $this->security->getUser();
            // Assigner l'utilisateur au Customer qu'on est en train de créer
            if ($user) {
                $comment->setUser($user)
                        ->setCreatedAt(new \DateTime())
                ;
            }
        }
    }
}
