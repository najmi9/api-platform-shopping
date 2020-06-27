<?php

namespace App\Dto;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "post"={
 *           "path"="/users/account/activation"
 *          },
 *      },
 *      itemOperations={},
 * )
 */

final class AccountActivationRequest
{
    /**
     * @Assert\Length(min=6,max=6)
     * @Assert\Type(type="integer", message="le code d'activation doit être un   
     * entier ")
     * @Assert\NotBlank(message="le code d'activation ne peut pas être vide")
     * @Assert\NotNull(message="le code d'activation ne peut pas être null")
     */
    private $activationCode;

    public function getActivationCode() : int
    {
    	return (int) $this->activationCode;
    }

      public function setActivationCode(int $activationCode) : void
    {
    	  $this->activationCode = $activationCode;
    }
}